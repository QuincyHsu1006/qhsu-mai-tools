// import './App.css'
import { useState , useEffect, use } from 'react'

function App() {
    const [msg, setMsg] = useState('正在讀取資料...');
    const [dataSong, setDataSong] = useState(null);


    useEffect(() => {
        window.opener.postMessage({type: 'ready', data: []}, 'https://maimaidx-eng.com');
        console.log('requiring data...');

        window.addEventListener('message', (event) => {
            console.log('received data, data:', event.data);
            const {type, data} = event.data;
            if (type === 'result'){
                //console.log(data[0]);
                setDataSong(data[0]);
            }
        });

    }, []);

    return (
        <>
            <h1>Main Page</h1>
            <div id="readingData">{msg}</div>
            <div id="result">{dataSong !== null ? dataSong.name : "nothing"}</div>
        </>
    )
}

export default App