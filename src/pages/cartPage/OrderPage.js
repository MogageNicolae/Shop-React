import NavBar from "../../navBar/NavBar";
import EmptyCart from "./EmptyCart";
import './OrderPage.css';
import {useEffect, useState} from "react";
import ProductsCartStage from "./ProductsCartStage/ProductsCartStage";
import {useGetCartQuery} from "../../API";
import {useParams} from "react-router-dom";
import UserInformationStage from "./UserInformationStage/UserInformationStage";

export default function OrderPage({cartSize}) {
    let {stage} = useParams();
    const [cartToShow, setCartToShow] = useState(null),
        stageParam = parseInt(stage),
        isStage = (!isNaN(stageParam) && stageParam >= 1 && stageParam <= 2),
        currentStage = isStage ? stageParam : 1,
        {
            data: cart,
            isLoading,
            isFetching,
            isError,
            error,
        } = useGetCartQuery([JSON.parse(localStorage.getItem('user'))]);

    useEffect(() => {
        if (cart === null || cart === undefined || cart.quantity === 0) {
            setCartToShow(<EmptyCart/>);
        } else if (currentStage === 1){
            setCartToShow(<ProductsCartStage key="productCart" cart={cart} setCartToShow={setCartToShow}/>);
        } else {
            setCartToShow(<UserInformationStage key="userInformationPage" totalPrice={cart.discountTotal} setCartToShow={setCartToShow}/>);
        }
    }, [cart]);

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

    if (isError) {
        console.log({error});
        return (
            <div className="app">
                <NavBar cartSize={cartSize}/>
                <main className="main-container">
                    error.status: {error.status}
                </main>
                <footer></footer>
            </div>
        );
    }

    return (
        <div className="app">
            <NavBar cartSize={cartSize}/>
            <main className="main-container">
                {cartToShow}
            </main>
            <footer></footer>
        </div>
    );
}
