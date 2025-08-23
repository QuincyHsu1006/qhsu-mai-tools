import { Link } from 'react-router-dom';
import '../show-rating/App.css';

function Navbar() {

    return (
        <>
            <div className="navbar">
                <Link to="/"><button className="navbar_btn btn">R值組成</button></Link>
                <Link to="/record"><button className="navbar_btn btn">遊玩紀錄</button></Link>
                <Link to="/plates"><button className="navbar_btn btn">名牌版</button></Link>
            </div>
        </>
    )
}

export default Navbar;