import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react"
import PlayingCard from "./PlayingCard"

function Player(props) {
    return (
        <Box bg="RGBA(0, 0, 0, 0.24)" borderRadius="20px" minHeight="200px" width="300px">
            <Flex flexDirection="column" justifyContent="space-between" height="200px">

                <Box bg="#90CDF4" borderTopRadius="20px" color="black">
                    <Text>{props.playerName}</Text>
                </Box>

                <SimpleGrid columns="5" spacing="4" margin="1rem">
                    <PlayingCard card_num="QH" />
                    <PlayingCard card_num="3S" />
                    <PlayingCard card_num="2C" />
                    <PlayingCard card_num="1D" />
                    <PlayingCard card_num="3S" />
                </SimpleGrid>

                <Box>
                    <Text>Hand total: {props.hand}</Text>
                </Box>

                <Box bg="#90CDF4" borderBottomRadius="20px" color="black">
                    <Text>Points: {props.points}</Text>
                </Box>

            </Flex>
        </Box>
    )
}

export default Player