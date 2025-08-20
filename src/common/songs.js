export const Difficulties = ['basic', 'advanced', 'expert', 'master', 'remaster'];

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

export class Song {
    constructor(title, type, version, score, difficulty, internalLevel,
                imgURL, apFlag, syncFlag
    ) {
        this.title = title;
        this.type = type;
        this.version = version;
        this.score = score.toFixed(4);
        this.difficulty = difficulty;
        this.internalLevel = internalLevel.toFixed(1);
        this.imgURL = imgURL;
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