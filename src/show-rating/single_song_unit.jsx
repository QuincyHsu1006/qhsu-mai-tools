import { Song } from "../common/songs";
import './single_song_unit.css';

const difficultyColor = {
    basic: '#6fe163',
    advanced: '#f8df3a',
    expert: '#ff828e',
    master: '#c27ff4',
    remaster: '#e5ddea',
    none: '#cccccc'
}

function SingleSongUnit({ song, index }) {

    return ( song ?
        <>
            <div id="single_song_unit" className="box" style={{'--bg-color': difficultyColor[song.difficulty]}}>
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
            <div id="single_song_unit" className="box" style={{'--bg-color': difficultyColor.none}}></div>
        </>
    )
}

export default SingleSongUnit