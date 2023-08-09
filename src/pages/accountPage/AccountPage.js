import NavBar from "../../navBar/NavBar";
import {useAuth} from "../Authentification";
import "./AccountPage.css";

export default function AccountPage() {
    const auth = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        auth.logout();
    }

    return (
        <div className="app">
            <NavBar/>
            <div className="logout-button-wrapper">
                <button className="logout-button" onClick={handleLogout}> Log out</button>
            </div>
            <footer></footer>
        </div>
    );
}