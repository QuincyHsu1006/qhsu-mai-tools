import { useState } from "react";
import { PlateKanji } from "../common/songs";
import SelectOption from "../components/select_option";
import PlatesButtons from "./plates_buttons";
import SquareSongUnit from "../record/square_song_unit";
import { songFilter } from "../common/filter";
import './plates.css';
import DifficultyButtons from "./difficulty_buttons";


function Plates({scoreData}) {
    const [kanji, SetKanji] = useState("");
    const [plateType, SetPlateType] = useState(null);
    const [diff, SetDiff] = useState('master');

    const handleSelect = (e) => {
        SetKanji(e.target.value);
        SetPlateType(null);
        SetDiff('master');
    }
    const handlePlateBtn = (type) => {
        SetPlateType(type);
    }

    return (
        <>
            <div className="kanji_options">
                選擇版本
                <select defaultValue="" onChange={handleSelect}>
                    <option value=""></option>
                    {
                        Object.entries(PlateKanji).map(([key, value]) => {
                            return (
                                <SelectOption value={key} text={value}/>
                            )
                        })
                    }
                </select>
            </div>

            <div className="plate">
                { kanji !== "" &&
                    <PlatesButtons version={kanji} click={handlePlateBtn}/>
                }
            </div>
            <div>
                { plateType !== null &&
                        <DifficultyButtons version={kanji} click={SetDiff}/>
                }
            </div>
            <div className="whole_plateList">
                { plateType !== null &&
                    scoreData.filter(s => songFilter(s, kanji, 'plate') && s.difficulty === diff ).map((song, index) => {
                        return (
                            <>
                                <SquareSongUnit song={song} filterKey={plateType} filterFlag={null} index={index}/>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Plates;