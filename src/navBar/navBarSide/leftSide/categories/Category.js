export default function Category({value, hrefValue}) {
    return (
        <li><a href={hrefValue}>{value}</a></li>
    );
}