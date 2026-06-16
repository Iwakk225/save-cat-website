import { useState, useEffect } from 'react';
import Navbar from './layouts/Navbar';
import Hero from './layouts/Hero';
import Impact from './layouts/Impact';
import CatLoader from './vfx/Loading';

export default function LandingPages() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Navbar />
            <Hero />
            <Impact />
            {loading && <CatLoader />}
        </>
    );
}