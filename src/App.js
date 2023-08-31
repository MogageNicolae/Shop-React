import './App.css';
import {Route, Routes} from "react-router-dom";
import {AuthProvider, ProtectedRoute} from "./pages/Authentification";
import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/productPage/ProductPage";
import LoginPage from "./pages/loginPage/LoginPage";
import OrderPage from "./pages/cartPage/OrderPage";
import AccountPage from "./pages/accountPage/AccountPage";
import {useEffect, useState} from "react";
import {useGetCartSizeQuery} from "./API";
import PageNotFound from "./pages/PageNotFound";
import OrderHistoryPage from "./pages/accountPage/OrderHistoryPage";

function App() {
    const [size, setSize] = useCartSize();
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LandingPage cartSize={size}/>}/>
                <Route path="/Shop-React" element={<LandingPage cartSize={size}/>}/>
                <Route path="/products" element={<MainPage cartSize={size}/>}/>
                <Route path="/products/:page" element={<MainPage cartSize={size}/>}/>
                <Route path="/product-page/:productId" element={<ProductPage cartSize={size}/>}/>
                <Route path="/login" element={<LoginPage cartSize={size} setCartSize={setSize}/>}/>
                <Route path="/account" element={<ProtectedRoute><AccountPage cartSize={size} setCartSize={setSize}/></ProtectedRoute>}/>
                <Route path="/account/order/:id"
                       element={<ProtectedRoute><OrderHistoryPage cartSize={size}/></ProtectedRoute>}/>
                <Route path="/order/:stage" element={<ProtectedRoute><OrderPage cartSize={size}/></ProtectedRoute>}/>
                <Route path="*" element={<PageNotFound cartSize={size}/>}/>
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

    return [cartSize, setCartSize];
}

export default App;

