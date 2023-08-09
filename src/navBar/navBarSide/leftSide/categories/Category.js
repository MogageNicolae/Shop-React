import {Link} from "react-router-dom";

export default function Category({value, hrefValue}) {
    return (
        // <li><a href={hrefValue}>{value}</a></li>
        <li><Link to={hrefValue}>{value}</Link></li>
    );
}