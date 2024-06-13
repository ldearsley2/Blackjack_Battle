import { Box, Flex, SimpleGrid } from "@chakra-ui/react"
import PlayingCard from "./PlayingCard"

const styles = {
    box: {
        width: "15rem",
        height: "15rem",
        backgroundColor: "white",
        borderRadius: "",
    }
}

function Dealer(props) {
    return (
            <Box bg="grey" borderRadius="20px" width="15rem" height="15rem">
                <Flex flexDirection="column" justifyContent="space-between" height="15rem">
                    <Box textColor="white" fontSize="25px" bg="blue" borderTopRadius="10px">
                        <p>{props.dealerName}</p>
                    </Box>

                    <SimpleGrid columns="4" margin="1rem">
                        <PlayingCard card_num="10H"/>
                    </SimpleGrid>

                    <p>Hand total: {props.handTotal}</p>
                </Flex>
            </Box>
    )
}

export default Dealer