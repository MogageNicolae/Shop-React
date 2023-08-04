import './NavBar.css';
import NavBarLeft from "./navBarSide/leftSide/NavBarLeft";
import NavBarRight from "./navBarSide/rightSide/NavBarRight";


export default function NavBar() {
    return (
        <nav className="nav-bar">
            <h1 className="shop-name">Mogos-Hermanos</h1>
            <div className="nav-bar-menu">
                <NavBarLeft />
                <NavBarRight />
            </div>
        </nav>
    );
}