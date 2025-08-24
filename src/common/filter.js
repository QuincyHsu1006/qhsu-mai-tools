import { ScoreAchievements, APAchievements, SyncAchievements, StarAchievements, PlateKanji, Versions } from "./songs";

export function findSongFilterFlagByKey(key, defaultFlag){
    if(key in ScoreAchievements) return 'score';
    if(key in APAchievements) return 'AP';
    if(key in SyncAchievements) return 'sync';
    if(key in StarAchievements) return 'star';
    if(key in PlateKanji) return 'plate';

    return defaultFlag === null? 'score' : defaultFlag;

}

export function songFilter(song, filterKey, filterFlag){
    if(filterKey === null || filterKey === 'none') return false;

    // if(filterFlag !== 'score' &&
    //     filterFlag !== 'AP' &&
    //     filterFlag !== 'sync' &&
    //     filterFlag !== 'star' &&
    //     filterFlag !== 'plate') filterFlag = 'score';

    if(filterFlag === 'score' || filterKey in ScoreAchievements){
        return song.score >= ScoreAchievements[filterKey];
    }

    if(filterFlag === 'AP' || filterKey in APAchievements){
        return song.apFlag >= APAchievements[filterKey];
    }

    if(filterFlag === 'sync' || filterKey in SyncAchievements){
        return song.syncFlag >= SyncAchievements[filterKey];
    }

    if(filterFlag === 'star' || filterKey in StarAchievements){
        return song.dxScore >= StarAchievements[filterKey];
    }

    if(filterFlag === 'plate' || filterKey in PlateKanji){
        if(filterKey === "真"){
            return song.version <= 1 && song.title !== 'ジングルベル';
        }
        else if(filterKey === "舞/覇者"){
            return song.version <= 12;
        }
        else return Versions[song.version] === PlateKanji[filterKey];
    }

    return false;

}