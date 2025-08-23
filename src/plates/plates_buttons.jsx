import { PlateAchievements } from "../common/songs";
import './plates_buttons.css';
import '../show-rating/App.css';

function PlatesButtons({version, click}){

    if (version === "真"){
        return (
            <>
                <button className="plate_btn btn" onClick={()=>{click('FC')}}>真極</button>
                <button className="plate_btn btn" onClick={()=>{click('AP')}}>真神</button>
                <button className="plate_btn btn" onClick={()=>{click('FDX')}}>真舞舞</button>
            </>
        )
    }
    if(version === "舞/覇者"){
        return (
            <>
                <button className="plate_btn btn" onClick={()=>{click('clear')}}>覇者</button>
                <button className="plate_btn btn" onClick={()=>{click('SSS')}}>舞将</button>
                <button className="plate_btn btn" onClick={()=>{click('FC')}}>舞極</button>
                <button className="plate_btn btn" onClick={()=>{click('AP')}}>舞神</button>
                <button className="plate_btn btn" onClick={()=>{click('FDX')}}>舞舞舞</button>
            </>
        )
    }

    return (
        <>
            {
                Object.entries(PlateAchievements).map(([key, value]) => {
                    return (
                        <button className="plate_btn btn" onClick={()=>{click(value)}}>{version}{key}</button>
                    )
                })
            }
        </>
    )
}

export default PlatesButtons;