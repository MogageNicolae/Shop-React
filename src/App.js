import './App.css';
import {Route, Routes} from "react-router-dom";
import {AuthProvider, ProtectedRoute} from "./pages/Authentification";
import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/productPage/ProductPage";
import LoginPage from "./pages/loginPage/LoginPage";
import CartPage from "./pages/cartPage/CartPage";
import AccountPage from "./pages/accountPage/AccountPage";
import {useEffect, useState} from "react";
import {useGetCartSizeQuery} from "./API";

function App() {
    const size = useCartSize();

    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LandingPage cartSize={size}/>}/>
                <Route path="/Shop-React" element={<LandingPage cartSize={size}/>}/>
                <Route path="/products" element={<MainPage cartSize={size}/>}/>
                <Route path="/products/:page" element={<MainPage cartSize={size}/>}/>
                <Route path="/product-page/:productId" element={<ProductPage cartSize={size}/>}/>
                <Route path="/login" element={<LoginPage cartSize={size}/>}/>
                <Route path="/account" element={<ProtectedRoute><AccountPage cartSize={size}/></ProtectedRoute>}/>
                <Route path="/cart" element={<ProtectedRoute><CartPage cartSize={size}/></ProtectedRoute>}/>
            </Routes>
        </AuthProvider>
    );
}

function useCartSize() {
    const [cartSize, setCartSize] = useState(0);
    const {
        data: cartSizeData,
    } = useGetCartSizeQuery([JSON.parse(localStorage.getItem('user'))], {skip: !JSON.parse(localStorage.getItem('user'))});

    useEffect(() => {
        setCartSize(cartSizeData === undefined ? 0 : cartSizeData);
    }, [cartSizeData]);

    return cartSize;
}

export default App;

