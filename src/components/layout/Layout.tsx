import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Nav from './nav/Nav'

export function Layout() {
    return (
        <>
            <Header />
            <Nav />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}