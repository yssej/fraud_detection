import Hero from './components/Hero.jsx';
import Features from "./components/Features.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./navigation/Navbar.jsx";
import Login from "./pages/Login.jsx";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <div className="min-h-screen">
            <Toaster position="top-right" />
            <Login />
        </div>
        // <div className="min-h-screen">
        //     <Navbar />
        //     <Hero />
        //     <Features />
        //     <HowItWorks />
        //     <CTA />
        //     <Footer />
        // </div>
    )
}

export default App;
