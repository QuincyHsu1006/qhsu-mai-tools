import SingleSongUnit from './single_song_unit.jsx';
import './b50_visualizer.css'

function B50Visualizer({scoreData, b50}) {
    const [new15, old35, totalNew15, totalOld35, totalAll] = b50;

    return (
        <>
            <div className="whole_chart song_list">
                <div className="detail">新曲總和：{totalNew15}</div>
                <div className="detail">舊曲總和：{totalOld35}</div>
                <div className="detail">全部總和：{totalAll}</div>
                <div className="detail">新曲平均：{(totalNew15 / new15.length).toFixed(2)}</div>
                <div className="detail">舊曲平均：{(totalOld35 / old35.length).toFixed(2)}</div>
                <div className="detail">總平均：{(totalAll / (new15.length + old35.length)).toFixed(2)}</div>
            </div>
            <div className="whole_chart">
                <h2>new songs</h2>
                <div id="new_song_list" className="song_list">
                    {new15.map((song, index) => {
                        return (
                            <SingleSongUnit song={song} index={index}/>
                        )
                    })}
                    {
                        new15.length < 15 && Array.from({length: 15 - new15.length}).map((_, index) => {
                            return (
                                <SingleSongUnit song={null} index={index}/>
                            )
                        })
                    }
                </div>
                <h2>old songs</h2>
                <div id="old_song_list" className="song_list">
                    {old35.map((song, index) => {
                        return (
                            <SingleSongUnit song={song} index={index}/>
                        )
                    })}
                    {
                        old35.length < 35 && Array.from({length: 35 - old35.length}).map((_, index) => {
                            return (
                                <SingleSongUnit song={null} index={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default B50Visualizer;