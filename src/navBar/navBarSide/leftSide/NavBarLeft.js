import Category from "./categories/Category";

export default function NavBarLeft() {
    return (
        <div className="nav-bar-menu-left">
            <ul>
                <Category value="Men" hrefValue="/products" />
                <Category value="Women" hrefValue="/products" />
                <Category value="Kids" hrefValue="/products" />
            </ul>
            <ul>
                <Category value="New Arrivals" hrefValue="/products" />
                <Category value="Shoes" hrefValue="/products" />
                <Category value="Clothing" hrefValue="/products" />
                <Category value="Accessories" hrefValue="/products" />
                <Category value="Sale" hrefValue="/products" />
            </ul>
        </div>
    );
}