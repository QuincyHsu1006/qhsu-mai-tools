import { DifficultyColors } from '../common/songs';
import './plates_buttons.css';
import '../show-rating/App.css';

function DifficultyButtons({kanji, click}){
    return (
        <>
            <button className="plate_btn diff_btn btn"
                style={{'--bg-color': DifficultyColors['basic']}}
                onClick={()=>{click('basic')}}>basic
            </button>
            <button className="plate_btn diff_btn btn"
                style={{'--bg-color': DifficultyColors['advanced']}}
                onClick={()=>{click('advanced')}}>advanced
            </button>
            <button className="plate_btn diff_btn btn"
                style={{'--bg-color': DifficultyColors['expert']}}
                onClick={()=>{click('expert')}}>expert
            </button>
            <button className="plate_btn diff_btn btn"
                style={{'--bg-color': DifficultyColors['master']}}
                onClick={()=>{click('master')}}>master
            </button>

            {kanji === "舞/覇者" &&
                <button className="plate_btn diff_btn btn"
                    style={{'--bg-color': DifficultyColors['remaster']}}
                    onClick={()=>{click('remaster')}}>remaster
                </button>
            }
        </>
    )
}

export default DifficultyButtons;