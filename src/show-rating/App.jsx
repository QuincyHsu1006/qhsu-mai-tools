import './App.css';
import { useState , useEffect } from 'react'
import { GetB50 } from './get_b50.js'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout.jsx';
import B50Visualizer from '../b50-visualizer/b50_visualizer.jsx';
import Record from '../record/record.jsx';
import Plates from '../plates/plates.jsx';
import { Difficulties } from '../common/songs.js';


var userInfo = null;
var scoreData = null;
var b50 = [];

function App() {
    const [result, setResult] = useState(false);

    const [minValue, setMinValue] = useState(14.0);
    const [maxValue, setMaxValue] = useState(14.5);
    const [minVtag, setMinVtag] = useState(14.0);
    const [maxVtag, setMaxVtag] = useState(14.5);
    // const [userInfo, setUserInfo] = useState(null);
    // const [songsData, setSongsData] = useState(null);


    useEffect(() => {
        window.opener.postMessage({type: 'ready', data: []}, 'https://maimaidx-eng.com');
        console.log('requiring data...');

        window.addEventListener('message', (event) => {
            const {type, data} = event.data;

            if (type === 'result'){
                userInfo = data[0];
                scoreData = data[1];

                const sortByDefault = (a, b) => {
                    return b.internalLevel - a.internalLevel ||
                        Difficulties.indexOf(b.difficulty) - Difficulties.indexOf(a.difficulty);
                }

                scoreData.sort(sortByDefault);

                b50 = GetB50(scoreData);

                //setMsg('資料讀取完成');
                setResult(true);
            }
        });

    }, []);

    return (
        <>
            <h1>簡易查分小工具</h1>
            {!result && <div>正在讀取資料...</div>}
            {result &&
                <>
                    <div className="flex_center">
                        <img src={userInfo.icon} className="icon"/>
                        <div>
                            <div className="trophy">
                                <img src={userInfo.trophyImg} style={{'width': '100%'}}/>
                                <div className="trophy_text text_center">{userInfo.trophy}</div>
                            </div>
                            <div className="name text_center">{userInfo.name}</div>
                            <div className="flex_center">
                                <div className="rating_block">
                                    <img src={userInfo.ratingFrame} style={{'width': '100%'}}/>
                                    <div className="rating_num">{userInfo.rating}</div>
                                </div>
                                <img src={userInfo.courseImg} className="c_img"/>
                                <img src={userInfo.classImg} className="c_img"/>
                            </div>

                        </div>

                    </div>
                </>
            }
            {result &&
                <>
                    <HashRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<B50Visualizer scoreData={scoreData} b50={b50} />}/>
                                <Route path="/record" element={<Record scoreData={scoreData}
                                    minValue={minValue} maxValue={maxValue} minVtag={minVtag} maxVtag={maxVtag}
                                    setMinValue={setMinValue} setMaxValue={setMaxValue} setMinVtag={setMinVtag} setMaxVtag={setMaxVtag}
                                />}/>
                                <Route path="/plates" element={<Plates scoreData={scoreData} />}/>
                            </Route>
                        </Routes>
                    </HashRouter>
                </>
            }
        </>
    )
}

export default App