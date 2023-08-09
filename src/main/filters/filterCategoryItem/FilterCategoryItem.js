export default function FilterCategoryItem({value, addedFilters, setAddedFilters}) {
    function handleApplySelectedFilter(filter) {
        filter.currentTarget.classList.toggle('filters-active');
        const filters = [...addedFilters];
        if (filters.includes(filter.currentTarget.children[0].innerHTML)) {
            filters.splice(filters.indexOf(filter.currentTarget.children[0].innerHTML), 1);
        } else {
            filters.push(filter.currentTarget.children[0].innerHTML);
        }
        setAddedFilters(filters);
    }

    return (
        <div className="filters-category-item" >
            <div className="filters-category-item-checkbox" onClick={handleApplySelectedFilter}>
                <span>{value}</span>
            </div>
        </div>
    );
}