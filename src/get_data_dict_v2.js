import fs from 'fs/promises';

import { fetchPage, fetchJSON } from './common/fetch.js';

(async () => {
    const DB = await fetchJSON('https://dp4p6x0xfi5o9.cloudfront.net/maimai/data.json');
    const ArcadeSongsDB = DB.songs;
    const Versions = DB.versions;
    const Types = ['std', 'dx'];

    let songDict = [];

    ArcadeSongsDB.forEach(element => {
        if(element.category !== "宴会場"){

            Types.forEach( type => {
                let song = {};

                const Chart = element.sheets.filter(chart => chart.type === type);

                //to check if international ver. has dx or std chart of each songs.
                if(Chart.length > 0 && Chart[0].regions.intl === true){
                    song['title'] = element.songId;
                    song['type'] = type;
                    song['genre'] = element.category;
                    const ver = ("version" in Chart[0].regionOverrides.intl) ? Chart[0].regionOverrides.intl.version :
                        ("version" in Chart[0] ? Chart[0].version : element.version);
                    song['version'] = Versions.findIndex(x => x.version === ver);
                    song['lv'] = [];
                    song['imgURL'] = element.imageName;

                    for(let chart of Chart){
                        song.lv.push(chart.internalLevelValue);
                    }

                    songDict.push(song);
                }
            })
        }
    });

    const TEXT = '[\n    ' + songDict.map(s => JSON.stringify(s)).join(',\n    ') + '\n]'
    fs.writeFile("./public/song_data_dict.json", TEXT, 'utf-8');

})();

