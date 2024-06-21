package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

type Server struct {
	clients    map[*Client]bool
	frontEnd   *Client
	register   chan *Client
	unRegister chan *Client
	broadcast  chan []byte
	dealerHand []Card
	deck       []Card
}

type Client struct {
	conn       *websocket.Conn
	clientType string
	playerHand []Card
}

type Card struct {
	Value string `json:"value"`
	Suit  string `json:"suit"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func createServer() *Server {
	return &Server{
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unRegister: make(chan *Client),
		broadcast:  make(chan []byte),
		deck:       make([]Card, 0),
	}
}

func main() {
	fmt.Println("Listening on 8080")
	http.HandleFunc("/ws", wsHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	connected_clients := make([]*websocket.Conn, 0)
	connected_clients = append(connected_clients, conn)
	fmt.Println(len(connected_clients))

	defer conn.Close()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		fmt.Println("Received message: ", string(message))

		err = conn.WriteMessage(messageType, message)
		if err != nil {
			log.Println(err)
			return
		}
	}
}

