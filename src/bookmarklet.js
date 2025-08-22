import { Song, Difficulties } from './common/songs.js';
import { fetchPage, fetchJSON } from './common/fetch.js';

//const MAIN_LINK = 'https://quincyhsu1006.github.io/qhsu-mai-tools/';
const MAIN_LINK = 'http://localhost:5173/qhsu-mai-tools/';

( async function() {

    const createButtons = () => {
        const namePlate = document.querySelector('.see_through_block');

        let buttons = `
            <div>
                <button id="read_data_btn">讀取資料</button>
            </div>
        `

        namePlate?.insertAdjacentHTML('afterend', buttons);

        document.getElementById('read_data_btn').addEventListener('click', openChildWindow);
    }


    const fetchSongDict = async () => {
        if(DataJSON !== null) return DataJSON;

        console.log('Fetching song dict...');
        DataJSON = await fetchJSON(MAIN_LINK + 'song_data_dict.json');
    }

    const fetchUserInfoData = async () => {
        if (userInfoData !== null) return userInfoData;

        console.log('Fetching user info...');
        const namePlateDOM = document.querySelector('.see_through_block > .basic_block');

        userInfoData = {};

        userInfoData.name = document.querySelector('.name_block').textContent;
        userInfoData.rating = Number(document.querySelector('.rating_block').textContent);

    }

    const fetchScoreData = async () => {
        if (scoreData !== null) return scoreData;

        scoreData = [];

        for(let i = 0; i < Difficulties.length; i++){
            console.log(`Fetching data for ${Difficulties[i]}...`);
            const resDOM = await fetchPage(`${url.origin}/maimai-mobile/record/musicGenre/search/?genre=99&diff=${i}`);

            const blocks = resDOM.querySelectorAll('.w_450.m_15.p_r.f_0');

            blocks.forEach(block => {

                const title = block.querySelector('.music_name_block').textContent;
                const type = block.querySelector('.music_kind_icon[src*="music_dx"]') ? 'dx' : 'std';

                const scoreBlk = block.querySelector('.music_score_block.w_112');
                const score = scoreBlk ? Number(scoreBlk.textContent.slice(0, -1)) : -1;

                const dxScoreBlk = block.querySelector('.music_score_block.w_190');

                const dxBefore = dxScoreBlk ? dxScoreBlk.textContent.replace(/[,\s]/g, "").split("/") : [];
                const dxScore = dxBefore.length > 0 ? Math.floor((Number(dxBefore[0]) / Number(dxBefore[1])) * 10000) / 100 : -1;

                const data = DataJSON.find(d => d.title === title && d.type === type);

                const version = data?.version || "";
                const internalLevel = data? data[Difficulties[i]] : 0;
                const imgURL = `https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover/${data?.imgURL}` || "";

                let apFlag = 0;
                let syncFlag = 0;

                if(scoreBlk) {
                    const flagBlk = Array.from(block.querySelectorAll('img.h_30.f_r')).map(el => el.src);

                    if(flagBlk.some(src => src.includes('music_icon_fc'))){
                        apFlag = 1;
                    }
                    if(flagBlk.some(src => src.includes('music_icon_fcp'))){
                        apFlag = 2;
                    }
                    if(flagBlk.some(src => src.includes('music_icon_ap'))){
                        apFlag = 3;
                    }
                    if(flagBlk.some(src => src.includes('music_icon_app'))){
                        apFlag = 4;
                    }

                    if(flagBlk.some(src => src.includes('music_icon_sync'))){
                        syncFlag = 1;
                    }
                    if(flagBlk.some(src => src.includes('music_icon_fs'))){
                        syncFlag = 2;
                    }
                    if(flagBlk.some(src => src.includes('music_icon_fsp'))){
                        syncFlag = 3;
                    }
                    if(flagBlk.some(src => src.includes('music_icon_fdx'))){
                        syncFlag = 4;
                    }
                    if(flagBlk.some(src => src.includes('music_icon_fdxp'))){
                        syncFlag = 5;
                    }

                }
                let s = new Song(title, type.toUpperCase(), version, score, dxScore, Difficulties[i], internalLevel, imgURL, apFlag, syncFlag);
                scoreData.push(s);
            })

        }
    };


    const openChildWindow = () => {
        document.getElementById('read_data_btn').disabled = true;

        window.addEventListener('message', eventReceiver);

        if (childWin == null){
            childWin = window.open(MAIN_LINK + 'show-rating/');
        }
    }


    const eventReceiver = async (event) => {
        const {type, data} = event.data;
        if(type === 'ready'){

            await fetchSongDict();
            await fetchUserInfoData();
            await fetchScoreData();

            console.log('fetch done');
            childWin.postMessage({
                type: 'result',
                data: [userInfoData, scoreData]
            }, MAIN_LINK);
        }
    }



    const url = new URL(location.href);

    let DataJSON = null
    let childWin = null;
    let userInfoData = null;
    let scoreData = null;

    if(url.pathname === "/maimai-mobile/home/"){
        createButtons();
    }


})();