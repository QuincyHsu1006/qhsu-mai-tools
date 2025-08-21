import {useState, useEffect} from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import SquareSongUnit from './square_song_unit';
import DividerLine from './divider_line';
import './record.css';

function Record({scoreData, minValue, maxValue, minVtag, maxVtag, setMinValue, setMaxValue, setMinVtag, setMaxVtag}) {

    const handleChange = (e) => {
        setMinValue(e.minValue);
        setMaxValue(e.maxValue);
    };
    const handleInput = (e) => {
        setMinVtag(e.minValue.toFixed(1));
        setMaxVtag(e.maxValue.toFixed(1));
    };

    let currLevel = (maxValue + 0.1).toFixed(1);

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

                            <SquareSongUnit song={song} index={index}/>

                            </>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Record;