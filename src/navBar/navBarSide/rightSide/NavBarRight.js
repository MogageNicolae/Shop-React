import SearchBar from "./searchBar/SearchBar";
import Control from "./controls/Control";

export default function NavBarRight() {
    return (
        <div className="nav-bar-menu-right">
            <ul>
                <Control value='person' />
                <Control value='favorite' />
                <Control value='shopping_bag' />
            </ul>
            <SearchBar />
        </div>
    );
}