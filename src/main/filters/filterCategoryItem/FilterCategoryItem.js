export default function FilterCategoryItem({value, addedFilters, setAddedFilters}) {
    function handleApplySelectedFilter(filter) {
        filter.currentTarget.classList.toggle('filters-active');
        if (addedFilters.includes(filter.currentTarget.children[0].innerHTML)) {
            addedFilters.splice(addedFilters.indexOf(filter.currentTarget.children[0].innerHTML), 1);
        } else {
            addedFilters.push(filter.currentTarget.children[0].innerHTML);
        }
        console.log(addedFilters);
        setAddedFilters(addedFilters);
    }

    return (
        <div className="filters-category-item" >
            <div className="filters-category-item-checkbox" onClick={handleApplySelectedFilter}>
                <span>{value}</span>
            </div>
        </div>
    );
}