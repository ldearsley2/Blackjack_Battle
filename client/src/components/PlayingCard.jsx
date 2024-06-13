import { Box } from "@chakra-ui/react";

function PlayingCard(props) {
    return (
        <Box bg="white" textColor="black" height="60px" width="40px" borderRadius="10px">
            <p>{props.card_num}</p>
        </Box>
    )
}

export default PlayingCard