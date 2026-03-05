import React from 'react';
import Navbar from '../navigation/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </div>
    )
}

export default LandingPage;
