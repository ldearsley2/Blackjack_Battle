package main

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type player struct {
	id string
	name string
	points int
	cards []string
	isPlaying bool
	conn *websocket.Conn
}

func newPlayer(name string, points int, conn *websocket.Conn) *player {
	client := player{
		id: uuid.New().String(),
		name: name,
		points: points,
		cards: make([]string, 0),
		isPlaying: false,
		conn: conn,
	}
	return &client
}

func main() {
	fmt.Println("Foobar")

	
}