import { DifficultyColors } from "../common/songs"
import { songFilter } from "../common/filter";
import "./square_song_unit.css"

function SquareSongUnit({song, filterKey, filterFlag}){
    let flag = songFilter(song, filterKey, filterFlag);

    return (
        <>
            <div className="square" style={{'--bg-color': DifficultyColors[song.difficulty]}}>
                <div className="img_border">
                    <img className="song_img" src={song.imgURL} style={{'--brightness': (flag ? 0.25 : 0.8)}}/>
                    <div className="song_title wd">{song.title}</div>
                </div>
            </div>
        </>
    )
}

export default SquareSongUnit