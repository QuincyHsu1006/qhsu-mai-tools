import './App.css';
import { useState , useEffect } from 'react'
import { GetB50 } from './get_b50.js'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout.jsx';
import B50Visualizer from '../b50-visualizer/b50_visualizer.jsx';
import Record from '../record/record.jsx';
import Plates from '../plates/plates.jsx';


var userInfo = null;
var scoreData = null;
var b50 = [];

function App() {
    const [msg, setMsg] = useState('正在讀取資料...');
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

                scoreData.sort((a, b) => {return b.internalLevel - a.internalLevel});

                b50 = GetB50(scoreData);

                //setMsg('資料讀取完成');
                setResult(true);
            }
        });

    }, []);

    return (
        <>
            <h1>簡易查分小工具</h1>
            <div className={result ? 'none' : ''}>{msg}</div>
            {result &&
                <>
                    <div id="user_name">{userInfo.name}</div>
                    <div id="user_rating">Rating: {userInfo.rating}</div>
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