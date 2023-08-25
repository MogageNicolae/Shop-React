import NavBar from "../navBar/NavBar";

export default function PageNotFound({cartSize}) {
    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <h1 style={{textAlign: "center"}}>Page not found</h1>
            <footer></footer>
        </div>
    );
}