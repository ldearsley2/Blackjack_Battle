import { Flex } from "@chakra-ui/react";
import Dealer from "./Dealer";
import PlayerContainer from "./PlayerContainer";

function GameContainer() {
    return (
        <Flex flexDirection="column" alignItems="center" gap="40px">
            <Dealer dealerName="dealer1"/>
            <PlayerContainer/>
        </Flex>
    )
}

export default GameContainer