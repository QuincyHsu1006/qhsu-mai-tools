import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <>
            <Link to="/">B50</Link>
            <Link to="/record">Record</Link>
            <Link to="/plates">Plates</Link>
        </>
    )
}

export default Navbar;