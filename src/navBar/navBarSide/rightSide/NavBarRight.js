import SearchBar from "./searchBar/SearchBar";
import Control from "./controls/Control";

export default function NavBarRight({cartSize}) {
    return (
        <div className="nav-bar-menu-right">
            <ul>
                <Control value='person' linkToValue='/account'/>
                <Control value='favorite' linkToValue='/'/>
                <Control value='shopping_bag' linkToValue='/cart' size={cartSize}/>
            </ul>
            <SearchBar/>
        </div>
    );
}
