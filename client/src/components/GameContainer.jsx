import { Flex } from "@chakra-ui/react";
import Dealer from "./Dealer";
import PlayerContainer from "./PlayerContainer";
import { useEffect, useState } from "react";

const ws = new WebSocket('ws://localhost:8080/ws?type=frontend')

function GameContainer() {
    const [websocket, setWebSocket] = useState(null)

    useEffect(() => {
        setWebSocket(ws)
        
        ws.onopen = () => {
            console.log('Connected to server')
        }

        ws.onmessage = (event) => {
            console.log(event.data)
        }

        ws.onclose = () => {
            console.log('Disconnected from server')
        }
    
    }, [])

    return (
        <Flex flexDirection="column" alignItems="center" gap="40px">
            <Dealer dealerName="dealer1"/>
            <PlayerContainer/>
        </Flex>
    )
}

export default GameContainer