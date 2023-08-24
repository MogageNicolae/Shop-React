import NavBar from "../navBar/NavBar";
import Main from "../main/Main";
import {useState} from "react";

export default function MainPage({cartSize}) {
    const [notification, setNotification] = useState(null);

    function showNotification() {
        setNotification(<Notification/>);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }

    return (
        <div className="app">
            {notification}
            <NavBar cartSize={cartSize}/>
            <Main showNotification={showNotification}/>
            <footer></footer>
        </div>
    );
}

function Notification() {
    return (
        <div className="notification">
            Added to cart.
        </div>
    );
}