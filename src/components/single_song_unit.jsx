import { Song } from "../common/songs";

function SingleSongUnit({ song, index }) {

    return (
        <>
            <h4>{song.title}</h4>
            <div>
                <span>Type: {song.type} </span>
                <span>Difficulty: {song.difficulty} </span>
                <span>{song.internalLevel} </span>
                <span>Score: {song.score} </span>
                <span>Rating: {song.rating} </span>

            </div>
        </>
    )
}

export default SingleSongUnit