import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider, ProtectedRoute} from "./pages/Authentification";
import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/loginPage/LoginPage";
import CartPage from "./pages/cartPage/CartPage";
import AccountPage from "./pages/accountPage/AccountPage";
import {Provider} from "react-redux";
import {store} from "./pages/cartPage/redux/store";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/products" element={<MainPage/>}/>
                        <Route path="/products/:page" element={<MainPage/>}/>
                        <Route path="/product-page/:productId" element={<ProductPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/account" element={<ProtectedRoute><AccountPage/></ProtectedRoute>}/>
                        <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
                    </Routes>
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
