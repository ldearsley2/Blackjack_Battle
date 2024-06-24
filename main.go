package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
)

type GameState struct {
	Players map[*websocket.Conn]PlayerState `json:"players"`
	Dealer  []Card                          `json:"dealer"`
}

type PlayerState struct {
	Hand    []Card `json:"hand"`
	Message string `json:"message"`
}

type Server struct {
	clients     map[*websocket.Conn]bool
	register    chan *websocket.Conn
	unRegister  chan *websocket.Conn
	broadcast   chan []byte
	gameState   GameState
	actionMutex sync.Mutex
}

type Card struct {
	Value string `json:"value"`
	Suit  string `json:"suit"`
}

func createServer() *Server {
	return &Server{
		clients:    make(map[*websocket.Conn]bool),
		register:   make(chan *websocket.Conn),
		unRegister: make(chan *websocket.Conn),
		broadcast:  make(chan []byte),
		gameState: GameState{
			Players: make(map[*websocket.Conn]PlayerState),
			Dealer:  []Card{},
		},
	}
}

func (s *Server) run() {
	for {
		select {
		case client := <-s.register:
			s.clients[client] = true
			s.gameState.Players[client] = PlayerState{
				Hand:    []Card{},
				Message: "Welcome",
			}
		case client := <-s.unRegister:
			if _, ok := s.clients[client]; ok {
				delete(s.clients, client)
				delete(s.gameState.Players, client)
			}
		case message := <-s.broadcast:
			for client := range s.clients {
				client.WriteMessage(websocket.TextMessage, message)
			}
		}
	}
}

func (s *Server) sendGameState(conn *websocket.Conn) {
	gameStateJSON, err := json.Marshal(s.gameState)
	if err != nil {
		log.Println("Error whilst marshaling game state:", err)
		return
	}
	conn.WriteMessage(websocket.TextMessage, gameStateJSON)
}

func (s *Server) broadcaseGameState() {
	gameStateJSON, err := json.Marshal(s.gameState)
	if err != nil {
		fmt.Println("Error broadcasting game state:", err)
	}

	for client := range s.clients {
		err := client.WriteMessage(websocket.TextMessage, gameStateJSON)
		if err != nil {
			log.Printf("Error sending message to client: %v", err)
			client.Close()
			delete(s.clients, client)
		}
	}
}

func (s *Server) handleAction(conn *websocket.Conn, action string) {
	s.actionMutex.Lock()

	defer s.actionMutex.Unlock()

	playerState := s.gameState.Players[conn]

	switch action {
	case "hit":
		playerState.Hand = append(playerState.Hand, s.dealCard())
		playerState.Message = "Player hit"
	case "stand":
		playerState.Message = "Player stood"
	}

	s.gameState.Players[conn] = playerState
	s.broadcaseGameState()
}

func (s *Server) dealCard() Card {
	// TODO implement card dealing
	return Card{Value: "Ace", Suit: "Spades"}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (s *Server) handleConnections(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading connection:", err)
		return
	}

	s.register <- conn

	defer func() {
		s.unRegister <- conn
		conn.Close()
	}()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}
		var msg map[string]string
		if err := json.Unmarshal(message, &msg); err != nil {
			log.Println("Error unmarshaling message:", err)
			continue
		}

		if action, ok := msg["action"]; ok {
			s.handleAction(conn, action)
		}

	}

}

func main() {
	server := createServer()
	go server.run()

	router := mux.NewRouter()
	router.HandleFunc("/ws", server.handleConnections)

	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8080", nil))

	fmt.Println("Listening on 8080")
}
