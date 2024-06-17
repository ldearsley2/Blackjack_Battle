import { Flex } from "@chakra-ui/react";
import Dealer from "./Dealer";
import PlayerContainer from "./PlayerContainer";

function GameContainer() {

    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.addEventListener('open', (event) => {
        socket.send("Hello server!")
    })

    socket.addEventListener('message', (event) => {
        console.log('Message from server: ', event.data)
    })

    return (
        <Flex flexDirection="column" alignItems="center" gap="40px">
            <Dealer dealerName="dealer1"/>
            <PlayerContainer/>
        </Flex>
    )
}

export default GameContainer