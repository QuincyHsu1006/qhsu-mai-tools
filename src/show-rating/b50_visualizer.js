import { Versions } from "../common/songs.js";

const currentVersion = Versions[Versions.length - 1];

export function ShowB50(scoreData) {
    const [new15, old35] = GetB50Songs(scoreData);

    const totalNew15 = GetTotalRating(new15);
    const totalOld35 = GetTotalRating(old35);
    const totalAll = totalNew15 + totalOld35;

    return [new15, old35, totalNew15, totalOld35, totalAll];
}

function GetB50Songs(scoreData) {
    let newSongs = scoreData.filter(s => s.version === currentVersion && s.score >= 0);
    let oldSongs = scoreData.filter(s => s.version !== currentVersion && s.score >= 0);

    const sortByRating = (a, b) => b.rating - a.rating || b.score - a.score;

    return [
        newSongs.sort(sortByRating).slice(0, 15),
        oldSongs.sort(sortByRating).slice(0, 35)
    ];
}

function GetTotalRating(scoreData) {
    return scoreData.reduce((total, song) => total + song.rating, 0);
}