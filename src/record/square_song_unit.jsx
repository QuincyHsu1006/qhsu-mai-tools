import { DifficultyColors, APAchievements, SyncAchievements } from "../common/songs"
import { songFilter } from "../common/filter";
import "./square_song_unit.css"

function SquareSongUnit({song, filterKey, filterFlag}){
    let flag = songFilter(song, filterKey, filterFlag);

    return (
        <>
            <div className="square" style={{'--bg-color': DifficultyColors[song.difficulty]}}>
                <div className="img_border">
                    <img className="song_img" src={song.imgURL} style={{'--brightness': (flag ? 0.2 : 0.65)}}/>
                    <div className="song_title wd">{song.title}</div>
                    <div className="Achievements" style={{'--wdcolor': (flag ? 'yellow' : 'white')}}>
                        {filterFlag === 'score' && (song.score >= 0 && song.score.toFixed(4).slice(0, -2))}
                        {filterFlag === 'AP' && Object.keys(APAchievements).find(k => APAchievements[k] === song.apFlag)}
                        {filterFlag === 'sync' && Object.keys(SyncAchievements).find(k => SyncAchievements[k] === song.syncFlag)}
                        {filterFlag === 'star' && (song.dxScore >= 0 && `${song.dxScore}%`)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SquareSongUnit