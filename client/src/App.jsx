import React, {Suspense} from "react";
import Register from "./pages/Register.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import {Toaster} from "react-hot-toast";
import { Routes, Route} from "react-router-dom";
import Spinner from "./components/Spinner.jsx";
import Navbar from "./navigation/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Draft from "./pages/Draft.jsx";



function App() {
    return (
        <Suspense
            fallback={
                <>
                    <Navbar />
                    <Spinner size={100} />
                    <Footer />
                </>
            }
        >
            <Toaster position="top-right" />
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/draft" element={<Draft />} />
            </Routes>
        </Suspense>
    )
}

export default App;
