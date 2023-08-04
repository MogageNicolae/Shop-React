export default function FilterCategoryItem({value}) {
    return (
        <div className="filters-category-item">
            <div className="filters-category-item-checkbox">
                <span>{value}</span>
            </div>
        </div>
    );
}