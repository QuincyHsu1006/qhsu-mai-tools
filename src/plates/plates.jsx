import { useState } from "react";
import { PlateKanji } from "../common/songs";
import SelectOption from "../components/select_option";
import PlatesButtons from "./plates_buttons";
import SquareSongUnit from "../record/square_song_unit";
import { songFilter } from "../common/filter";
import './plates.css';


function Plates({scoreData}) {
    const [kanji, SetKanji] = useState("");
    const [plateType, SetPlateType] = useState(null);

    const handleSelect = (e) => {
        SetKanji(e.target.value);
        SetPlateType(null);
    }
    const handlePlateBtn = (type) => {
        SetPlateType(type);
    }

    return (
        <>
            <h1>Plates Page</h1>
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
            <div className="plate">
                { kanji !== "" &&
                    <PlatesButtons version={kanji} click={handlePlateBtn}/>
                }
            </div>
            <div className="whole_plateList">
                { plateType !== null &&
                    scoreData.filter(s => songFilter(s, kanji, 'plate') && s.difficulty === 'master' ).map((song, index) => {
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