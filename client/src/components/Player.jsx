const styles = {
    box: {
        backgroundColor: "violet"
    }
}

function Player(props) {
    return (
        <div style={styles.box}>
            <p>{props.playerName}</p>
            <p>{props.points}</p>
        </div>
    )
}

export default Player