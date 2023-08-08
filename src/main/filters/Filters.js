import FilterCategoryTab from "./filterCategoryTab/FilterCategoryTab";
import FilterCategoryItem from "./filterCategoryItem/FilterCategoryItem";

export default function Filters({addedFilters, setAddedFilters}) {
    return (
        <section className="filters">
            <FilterCategoryTab value="Categories"/>
            <div className="filters-category">
                <FilterCategoryItem value='Smartphones' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Laptops' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
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