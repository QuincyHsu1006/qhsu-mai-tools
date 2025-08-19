// import './App.css'
// import SingleSongUnit from '../components/single_song_unit.jsx'
import SingleSongUnit from './single_song_unit.jsx';
import { useState , useEffect } from 'react'
import { ShowB50 } from './b50_visualizer.js'
import './App.css';


var userInfo = null;
var scoreData = null;
var b50 = [];

function App() {
    const [msg, setMsg] = useState('正在讀取資料...');
    const [result, setResult] = useState(false);
    // const [userInfo, setUserInfo] = useState(null);
    // const [songsData, setSongsData] = useState(null);


    useEffect(() => {
        window.opener.postMessage({type: 'ready', data: []}, 'https://maimaidx-eng.com');
        console.log('requiring data...');

        window.addEventListener('message', (event) => {
            console.log('received data, data:', event.data);
            const {type, data} = event.data;
            if (type === 'result'){
                //console.log(data[0]);
                userInfo = data[0];
                scoreData = data[1];

                b50 = ShowB50(scoreData);

                setMsg('資料讀取完成');
                setResult(true);
            }
        });

    }, []);

    return (
        <>
            <h1>Main Page</h1>
            <div id="readingData">{msg}</div>
            {result &&
                <>
                    <div id="user_name">{userInfo.name}</div>
                    <div id="user_rating">Rating: {userInfo.rating}</div>
                </>
            }
            {result &&
                <>
                    <div className="whole_chart">
                        <h2>new songs</h2>
                        <div id="new_song_list" className="song_list">
                            {b50[0].map((song, index) => {
                                return (
                                    <SingleSongUnit song={song} index={index}/>
                                )
                            })}
                            {
                                b50[0].length < 15 && Array.from({length: 15 - b50[0].length}).map((_, index) => {
                                    return (
                                        <SingleSongUnit song={null} index={index}/>
                                    )
                                })
                            }
                        </div>
                        <h2>old songs</h2>
                        <div id="old_song_list" className="song_list">
                            {b50[1].map((song, index) => {
                                return (
                                    <SingleSongUnit song={song} index={index}/>
                                )
                            })}
                            {
                                b50[1].length < 35 && Array.from({length: 35 - b50[1].length}).map((_, index) => {
                                    return (
                                        <SingleSongUnit song={null} index={index}/>
                                    )
                                })
                            }
                        </div>
                    </div>

                </>
            }
        </>
    )
}

export default App