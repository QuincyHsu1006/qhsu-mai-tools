import { DifficultyColors } from "../common/songs"

function SquareSongUnit({song}){
    return (
        <>
            <div className="box" style={{'--bg-color': DifficultyColors[song.difficulty]}}>

            </div>
        </>
    )
}

export default SquareSongUnit