import SearchBar from "./searchBar/SearchBar";
import Control from "./controls/Control";

export default function NavBarRight({cartSize, setSearchText}) {
    return (
        <div className="nav-bar-menu-right">
            <ul>
                <Control value='person' linkToValue='/account'/>
                <Control value='favorite' linkToValue='/'/>
                <Control value='shopping_bag' linkToValue='/order/1' size={cartSize}/>
            </ul>
            <SearchBar setSearchText={setSearchText}/>
        </div>
    );
}
