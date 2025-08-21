import {useState, useEffect} from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import SquareSongUnit from './square_song_unit';
import DividerLine from './divider_line';
import RadioChoice from '../components/radio_choice';
import { findSongFilterFlagByKey } from '../common/filter';
import { ScoreAchievements, APAchievements, SyncAchievements } from '../common/songs';
import './record.css';

function Record({scoreData, minValue, maxValue, minVtag, maxVtag, setMinValue, setMaxValue, setMinVtag, setMaxVtag}) {
    const [selectedValue, setSelectedValue] = useState("none");

    const handleChange = (e) => {
        setMinValue(e.minValue);
        setMaxValue(e.maxValue);
    };
    const handleInput = (e) => {
        setMinVtag(e.minValue.toFixed(1));
        setMaxVtag(e.maxValue.toFixed(1));
    };
    const handleSelected = (e) => {
        setSelectedValue(e.target.value);
    }

    let currLevel = (maxValue + 0.1).toFixed(1);
    let filterFlag = findSongFilterFlagByKey(selectedValue, null);

    return (
        <>
            <div className="level_filter">
                <div>{minVtag}</div>
                <MultiRangeSlider
                    min={1} max={15} step={0.1} stepOnly={true} minValue={minValue} maxValue={maxValue} ruler={false} label={false} canMinMaxValueSame={true}
                    style={{'border': 'none','boxShadow': 'none', 'width': '100%'}}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    onInput={(e) => {
                        handleInput(e);
                    }}
                />
                <div>{maxVtag}</div>
            </div>
            <div className="achievement_filter">
                <RadioChoice value={'none'} name={'achievements'} state={selectedValue} onchange={handleSelected}/>
                {
                    Object.entries(ScoreAchievements).map(([key, value]) => {
                        return (
                            <RadioChoice value={key} name={'achievements'} state={selectedValue} onchange={handleSelected}/>
                        )
                    })
                }
                <br/>
                {
                    Object.entries(APAchievements).map(([key, value]) => {
                        return (
                            <RadioChoice value={key} name={'achievements'} state={selectedValue} onchange={handleSelected}/>
                        )
                    })
                }
                <br/>
                {
                    Object.entries(SyncAchievements).map(([key, value]) => {
                        return (
                            <RadioChoice value={key} name={'achievements'} state={selectedValue} onchange={handleSelected}/>
                        )
                    })
                }
            </div>

            <div className="whole_list">
                {
                    scoreData.filter(s => s.internalLevel >= minValue && s.internalLevel <= maxValue).map((song, index) => {
                        return (
                            <>
                            { currLevel != song.internalLevel.toFixed(1) &&
                                <>
                                    <DividerLine n={currLevel = song.internalLevel.toFixed(1)} />
                                </>
                            }

                            <SquareSongUnit song={song} filterKey={selectedValue} filterFlag={filterFlag} index={index} />

                            </>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Record;