export const Difficulties = ['basic', 'advanced', 'expert', 'master', 'remaster'];

export const ScoreAchievements = {
    'SSS+': 100.5,
    'SSS': 100,
    'SS+': 99.5,
    'SS': 99,
    'S+': 98,
    'S': 97,
    'clear': 80
}

export const APAchievements = {
    'AP+': 4,
    'AP': 3,
    'FC+': 2,
    'FC': 1
}

export const SyncAchievements = {
    'FDX+': 5,
    'FDX': 4,
    'FS+': 3,
    'FS': 2,
    'sync': 1
}

export const StarAchievements = {
    //'6★': 99,
    //'5.5★': 98,
    '5★': 97,
    '4★': 95,
    '3★': 93,
    '2★': 90,
    '1★': 85
}

export const DifficultyColors = {
    basic: '#6fe163',
    advanced: '#f8df3a',
    expert: '#ff828e',
    master: '#c27ff4',
    remaster: '#e5ddea',
    none: '#cccccc'
}

export const Versions = [
        "maimai", "maimai PLUS", "GreeN", "GreeN PLUS",
        "ORANGE", "ORANGE PLUS", "PiNK", "PiNK PLUS",
        "MURASAKi", "MURASAKi PLUS", "MiLK", "MiLK PLUS",
        "FiNALE", "でらっくす", "でらっくす PLUS", "スプラッシュ",
        "スプラッシュ PLUS", "UNiVERSE", "UNiVERSE PLUS",
        "FESTiVAL", "FESTiVAL PLUS", "BUDDiES",
        "BUDDiES PLUS", "PRiSM", "PRiSM PLUS"
    ];

export const PlateKanji = {
    "真": "maimai ~ maimai PLUS",
    "超": "GreeN",
    "檄": "GreeN PLUS",
    "橙": "ORANGE",
    "暁": "ORANGE PLUS",
    "桃": "PiNK",
    "櫻": "PiNK PLUS",
    "紫": "MURASAKi",
    "菫": "MURASAKi PLUS",
    "白": "MiLK",
    "雪": "MiLK PLUS",
    "輝": "FiNALE",
    "舞/覇者": "maimai ~ FiNALE",
    "熊": "でらっくす",
    "華": "でらっくす PLUS",
    "爽": "スプラッシュ",
    "煌": "スプラッシュ PLUS",
    "宙": "UNiVERSE",
    "星": "UNiVERSE PLUS",
    "祭": "FESTiVAL",
    "祝": "FESTiVAL PLUS",
    "双": "BUDDiES",
    "宴": "BUDDiES PLUS",
    "鏡": "PRiSM",
    "？": "PRiSM PLUS"
}

export const PlateAchievements = {
    "将": 'SSS',
    "極": 'FC',
    "神": 'AP',
    "舞舞": 'FDX'
}

export class Song {
    constructor(title, type, version, score, dxScore, difficulty, internalLevel,
                imgURL, apFlag, syncFlag
    ) {
        //type: string
        this.title = title;
        this.type = type;
        this.version = version;
        this.difficulty = difficulty;
        this.imgURL = imgURL;

        //type: double
        this.score = score;
        this.internalLevel = internalLevel;
        this.dxScore = dxScore;

        //type: int
        this.apFlag = apFlag;
        this.syncFlag = syncFlag;
        this.rating = calculateRating(score, internalLevel);
    }


}

function calculateRating(score, internalLevel) {
    const Achievements = [
        100.5, 100.4999, 100,
        99.9999, 99.5, 99,
        98.9999, 98, 97,
        96.9999, 94, 90, 80,
        79.9999, 75, 70, 60,
        50, 40, 30, 20, 10, 0];

    const RatingFactor = [
        0.224, 0.222, 0.216,
        0.214, 0.211, 0.208,
        0.206, 0.203, 0.2,
        0.176, 0.168, 0.152, 0.136,
        0.128, 0.12, 0.112, 0.096,
        0.08, 0.064, 0.048, 0.032, 0.016, 0];

    if (score < 0 || internalLevel < 0) return 0;

    let idx = Achievements.findIndex((achievement) => score >= achievement);
    return Math.floor(Math.min(score, 100.5) * RatingFactor[idx] * internalLevel);

}