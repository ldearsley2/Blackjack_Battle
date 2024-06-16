import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react"
import PlayingCard from "./PlayingCard"

function Dealer(props) {
    return (
            <Box bg="RGBA(0, 0, 0, 0.24)" borderRadius="20px" width="15rem" height="15rem">
                <Flex flexDirection="column" justifyContent="space-between" height="15rem">
                    <Box textColor="black" fontSize="25px" bg="#90CDF4" borderTopRadius="10px">
                        <Text>{props.dealerName}</Text>
                    </Box>

                    <SimpleGrid columns="4" margin="1rem">
                        <PlayingCard card_num="10H"/>
                    </SimpleGrid>

                    <Text>Hand total: {props.handTotal}</Text>
                </Flex>
            </Box>
    )
}

export default Dealer