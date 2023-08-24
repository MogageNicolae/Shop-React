import NavBar from "../navBar/NavBar";

export default function LandingPage({cartSize}) {
    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <footer></footer>
        </div>
    );
}