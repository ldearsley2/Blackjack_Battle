import { Box, Flex, SimpleGrid } from "@chakra-ui/react"
import PlayingCard from "./PlayingCard"

function Player(props) {
    return (
        <Box bg="grey" borderRadius="20px" minHeight="200px" width="300px">
            <Flex flexDirection="column" justifyContent="space-between" height="200px">

                <Box bg="blue" borderTopRadius="20px">
                    {props.playerName}
                </Box>

                <SimpleGrid columns="5" spacing="4" margin="1rem">
                    <PlayingCard card_num="QH" />
                    <PlayingCard card_num="3S" />
                    <PlayingCard card_num="2C" />
                    <PlayingCard card_num="1D" />
                    <PlayingCard card_num="3S" />
                </SimpleGrid>

                <Box>
                    <p>Hand total: {props.hand}</p>
                </Box>

                <Box bg="blue" borderBottomRadius="20px">
                    <p>Points: {props.points}</p>
                </Box>

            </Flex>
        </Box>
    )
}

export default Player