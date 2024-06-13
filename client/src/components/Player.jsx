import { Box, Flex } from "@chakra-ui/react"

const styles = {
    box: {
        backgroundColor: "violet",
        height: "150px",
        width: "150px"
    }
}

function Player(props) {
    return (
        <Box bg="violet" borderRadius="20px" height="150px" width="150px">
            <Flex flexDirection="column" justifyContent="space-between" height="150px">
                <p>{props.playerName}</p>
                <p>{props.hand}</p>
                <p>{props.points}</p>
            </Flex>
        </Box>
    )
}

export default Player