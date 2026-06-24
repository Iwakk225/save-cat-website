import Navbar from './layouts/Navbar';
import Hero from './layouts/Hero';
import Impact from './layouts/Impact';
import HowTo from './layouts/HowTo';
import Kategori from './layouts/Kategori';

export default function LandingPages() {
    return (
        <>
            <Navbar />
            <Hero />
            <Impact />
            <HowTo />
            <Kategori />
        </>
    );
}