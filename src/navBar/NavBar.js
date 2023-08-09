import './NavBar.css';
import NavBarLeft from "./navBarSide/leftSide/NavBarLeft";
import NavBarRight from "./navBarSide/rightSide/NavBarRight";
import {Link} from "react-router-dom";


export default function NavBar() {
    return (
        <nav className="nav-bar">
            <h1 className="shop-name"><Link to={"/"} className="link-react">Mogos-Hermanos</Link></h1>
            <div className="nav-bar-menu">
                <NavBarLeft/>
                <NavBarRight/>
            </div>
        </nav>
    );
}