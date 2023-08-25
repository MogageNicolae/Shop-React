import NavBar from "../../navBar/NavBar";
import {useAuth} from "../Authentification";
import "./AccountPage.css";
import {orderApi, useGetOrdersQuery} from "../../API";
import OrderHistoryItem from "./OrderHistoryItem";

export default function AccountPage({cartSize}) {
    const auth = useAuth(),
        {
            data: orders,
            isLoading,
            isFetching,
            isError,
        } = useGetOrdersQuery([JSON.parse(localStorage.getItem('user'))]);

    const handleLogout = () => {
        fetch("http://localhost:3124/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth': `${localStorage.getItem('token')}`
            },
        }).then(response => {
            if (response.status !== 200) {
                alert("Error logging out");
                return;
            }
            localStorage.removeItem("token");
            auth.logout();
        });
    }

    if (isLoading || isFetching) {
        return (
            <div className="app">
                <NavBar cartSize={cartSize}/>
                <main className="main-container">
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                </main>
            </div>
        );
    }

    const orderHistoryItems = orders.toReversed().map((order) => {
        return (<OrderHistoryItem key={order._id} order={order}/>);
    });

    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <div className="logout-button-wrapper">
                <button className="logout-button" onClick={handleLogout}> Log out</button>
            </div>
            <div className="order-history-wrapper">
                <div className="order-history-title">Order history</div>
                <div className="order-history">
                    {orderHistoryItems}
                </div>
            </div>
            <footer></footer>
        </div>
    );
}