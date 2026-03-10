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
import NotFound from "./pages/NotFound.jsx";
import {ProtectedRoute} from "./routes/Protected.route.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";
import RiskPage from "./pages/Dashboard/RiskPage.jsx";
import ProfilePage from "./pages/Dashboard/ProfilePage.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";



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
                <Route path="*" element={<NotFound />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        {/* Les routes enfants sont placées DIRECTEMENT ici */}
                        <Route index element={<DashboardHome />} />
                        <Route path="risks" element={<RiskPage />} />
                        <Route path="profile" element={<ProfilePage />} /> {/* Parenthèse fermée + path relatif */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default App;
