import FilterCategoryTab from "./filterCategoryTab/FilterCategoryTab";
import FilterCategoryItem from "./filterCategoryItem/FilterCategoryItem";

export default function Filters({addedFilters, setAddedFilters}) {
    return (
        <section className="filters">
            <FilterCategoryTab value="Categories"/>
            <div className="filters-category">
                <FilterCategoryItem value='Smartphones' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Laptops' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Fragrances' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Skincare' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Groceries' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Home-decoration' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Furniture' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Tops' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Sunglasses' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Automotive' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Motorcycle' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Lighting' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
                <FilterCategoryItem value='Smartphones' addedFilters={addedFilters} setAddedFilters={setAddedFilters}/>
            </div>
            <FilterCategoryTab value="Price"/>
        </section>
    );
}