import NavBar from "../../navBar/NavBar";
import "./LandingPage.css";

export default function LandingPage({cartSize}) {
    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <div className="landing-page">
                <div className="landing-page-title">Welcome to Mogos-Hermanos</div>
                <div className="landing-page-subtitle">The best place to buy your favorite products</div>
                <div className="landing-page-button-wrapper">
                    <a href="/products"><button className="button landing-page-button">Shop now</button></a>
                </div>
            </div>
            <footer></footer>
        </div>
    );
}