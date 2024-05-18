import './layout.css'
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignupModal from '../modals/SignupModal';
import LoginModal from '../modals/LoginModal';
import { Toaster } from 'react-hot-toast';

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main> <Toaster position="top-right" toastOptions={{

                duration: 2000,


                //  options for specific types
                primary: {
                    style: {
                        background: 'var(--color-theme-primary)',
                        color: 'white',
                    }
                    ,
                    iconTheme: {
                        primary: 'white',
                        secondary: 'var(--color-theme-primary)',
                    },
                },
                success: {
                    style: {
                        background: 'var(--color-theme-success)',
                        color: 'white',
                    }
                    ,
                    iconTheme: {
                        primary: 'white',
                        secondary: 'var(--color-theme-success)',
                    },
                },
                error: {
                    style: {
                        background: 'var(--color-theme-error)',
                        color: 'white',
                    }
                    ,
                    iconTheme: {
                        primary: 'white',
                        secondary: 'var(--color-theme-error)',
                    },
                },

            }} />
            <Footer />
            <SignupModal></SignupModal>
            <LoginModal></LoginModal>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;