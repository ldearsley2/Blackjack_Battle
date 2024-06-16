import { Box, Text } from "@chakra-ui/react";

function PlayingCard(props) {
    return (
        <Box bg="white" textColor="black" height="60px" 
        width="40px" borderRadius="10px" boxShadow="dark-lg">
            <Text>{props.card_num}</Text>
        </Box>
    )
}

export default PlayingCard