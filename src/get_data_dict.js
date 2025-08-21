import { fetchPage, fetchJSON } from './common/fetch.js';
import { Versions } from './common/songs.js';

(async () => {

    const DataJSON = await fetchJSON('https://dp4p6x0xfi5o9.cloudfront.net/maimai/data.json');

    let songDict = [];

    for(let i = 0; i < Versions.length; i++) {
        const resDOM = await fetchPage(`https://maimaidx-eng.com/maimai-mobile/record/musicVersion/search/?version=${i}&diff=3`);

        const blocks = resDOM.querySelectorAll('.music_master_score_back');

        blocks.forEach(block => {
            let song = {};

            let title = block.querySelector('.music_name_block').textContent;
            let type = block.querySelector('.music_kind_icon[src*="music_dx"]') ? 'dx' : 'std';

            const data = DataJSON.songs.find(s => s.songId === title);

            song['title'] = title;
            song['type'] = type;
            song['version'] = Versions[i];
            song['imgURL'] = data.imageName;
            song['genre'] = data.category;

            song['basic'] = data.sheets.find(s => s.type === type && s.difficulty === 'basic')?.internalLevelValue || null;
            song['advanced'] = data.sheets.find(s => s.type === type && s.difficulty === 'advanced')?.internalLevelValue || null;
            song['expert'] = data.sheets.find(s => s.type === type && s.difficulty === 'expert')?.internalLevelValue || null;
            song['master'] = data.sheets.find(s => s.type === type && s.difficulty === 'master')?.internalLevelValue || null;
            song['remaster'] = data.sheets.find(s => s.type === type && s.difficulty === 'remaster')?.internalLevelValue || null;

            songDict.push(song);
        })
    }

    let jsonStr = JSON.stringify(songDict, null, 2);
    let blob = new Blob([jsonStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "song_data_dict.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

})();