import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
// import nav will go here

export function Layout() {
    return (
        <>
            <Header />
            {/** Nav will go here **/}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}