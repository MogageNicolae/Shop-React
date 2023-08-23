import {useState} from "react";
import {useAuth} from "../Authentification";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:3124/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (response.status === 404) {
            alert("User not found");
            return;
        }
        response.json().then(data => {
            auth.login(data.id);
            localStorage.setItem('token', data.token);
        });
        // await auth.login({email, password});
    }

    return (
        <div className="form-wrapper">
            <div className="form-title">Log in</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-label">Email</label>
                <div>
                    <input
                        id="email"
                        className="form-input"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </div>
                <label htmlFor="password" className="form-label">Password</label>
                <div>
                    <input
                        id="password"
                        className="form-input"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>
                <div>
                    <input className="form-submit" type="submit" value="Log in"/>
                </div>
            </form>
        </div>
    );
}