package main

import (
	"fmt"
	"net/http"
	"log"
	// "github.com/google/uuid"
	"github.com/gorilla/websocket"
)

// type player struct {
// 	id string
// 	name string
// 	points int
// 	cards []string
// 	isPlaying bool
// 	conn *websocket.Conn
// }

// func newPlayer(name string, points int, conn *websocket.Conn) *player {
// 	client := player{
// 		id: uuid.New().String(),
// 		name: name,
// 		points: points,
// 		cards: make([]string, 0),
// 		isPlaying: false,
// 		conn: conn,
// 	}
// 	return &client
// }

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
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


	defer conn.Close()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil{
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