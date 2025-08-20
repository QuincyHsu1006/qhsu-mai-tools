import { DifficultyColors } from "../common/songs";
import './single_song_unit.css';

function SingleSongUnit({ song, index }) {

    return ( song ?
        <>
            <div id="single_song_unit" className="box" style={{'--bg-color': DifficultyColors[song.difficulty]}}>
                <div className="img_border">
                    <img className="song_img" src={song.imgURL}/>
                    <div className="song_title wd">{song.title}</div>
                    <span className="song_type wd">{song.type}  {song.internalLevel}</span>
                    <span className="song_score wd">{song.score} </span>
                    <span className="song_rating wd">{song.rating} </span>
                </div>
            </div>
        </> :
        <>
            <div id="single_song_unit" className="box" style={{'--bg-color': DifficultyColors.none}}></div>
        </>
    )
}

export default SingleSongUnit