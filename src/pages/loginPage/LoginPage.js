import NavBar from "../../navBar/NavBar";
import "./LoginPage.css";
import LoginForm from "./LoginForm";
import {Navigate} from "react-router-dom";
import {useAuth} from "../Authentification";

export default function LoginPage({cartSize}) {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/account" />;
    }

    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <LoginForm/>
            <footer></footer>
        </div>
    );
}