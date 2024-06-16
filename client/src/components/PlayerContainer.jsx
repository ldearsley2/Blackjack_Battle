import { Box, SimpleGrid } from "@chakra-ui/react"
import Player from "./Player"

function PlayerContainer() {
    return (
        <Box bg="">
            <SimpleGrid columns="3" spacing="10">
                <Player playerName="p1" hand={15} points={10} />
                <Player playerName="p2" hand={21} points={10} />
                <Player playerName="p3" hand={11} points={10} />
                <Player playerName="p4" hand={14} points={10} />
                <Player playerName="p5" hand={19} points={10} />
                <Player playerName="p6" hand={7} points={10} />
            </SimpleGrid>
        </Box>
    )
}

export default PlayerContainer