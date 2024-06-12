import Player from "./Player"

const styles = {
    box: {
        width: "45rem",
        height: "15rem",
        backgroundColor: "white",
        borderRadius: "20px",
    }
}

function PlayerContainer() {
    return (
        <div style={styles.box}>
            <Player playerName="p1" points={10} />
        </div>
    )
}

export default PlayerContainer