import { DifficultyColors } from "../common/songs"
import "./square_song_unit.css"

function SquareSongUnit({song}){
    return (
        <>
            <div className="square" style={{'--bg-color': DifficultyColors[song.difficulty]}}>
                <div className="img_border">
                    <img className="song_img" src={song.imgURL}/>
                    <div className="song_title wd">{song.title}</div>
                </div>
            </div>
        </>
    )
}

export default SquareSongUnit