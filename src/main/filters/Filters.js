import FilterCategoryTab from "./filterCategoryTab/FilterCategoryTab";
import FilterCategoryItem from "./filterCategoryItem/FilterCategoryItem";

export default function Filters() {
    return (
        <section className="filters">
            <FilterCategoryTab value="Categories"/>
            <div className="filters-category">
                <FilterCategoryItem value='Smartphones' />
                <FilterCategoryItem value='Laptops' />
                <FilterCategoryItem value='Fragrances' />
                <FilterCategoryItem value='Skincare' />
                <FilterCategoryItem value='Groceries' />
                <FilterCategoryItem value='Home-decoration' />
                <FilterCategoryItem value='Furniture' />
                <FilterCategoryItem value='Tops' />
                <FilterCategoryItem value='Sunglasses' />
                <FilterCategoryItem value='Automotive' />
                <FilterCategoryItem value='Motorcycle' />
                <FilterCategoryItem value='Lighting' />
                <FilterCategoryItem value='Smartphones' />
            </div>
            <FilterCategoryTab value="Price"/>
        </section>
    );
}