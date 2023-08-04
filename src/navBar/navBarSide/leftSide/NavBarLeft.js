import Category from "./categories/Category";

export default function NavBarLeft() {
    return (
        <div className="nav-bar-menu-left">
            <ul>
                <Category value="Men" hrefValue="./index.html" />
                <Category value="Women" hrefValue="./index.html" />
                <Category value="Kids" hrefValue="./index.html" />
            </ul>
            <ul>
                <Category value="New Arrivals" hrefValue="./index.html" />
                <Category value="Shoes" hrefValue="./index.html" />
                <Category value="Clothing" hrefValue="./index.html" />
                <Category value="Accessories" hrefValue="./index.html" />
                <Category value="Sale" hrefValue="./index.html" />
            </ul>
        </div>
    );
}