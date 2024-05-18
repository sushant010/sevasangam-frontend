import './layout.css'
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignupModal from '../modals/SignupModal';
import LoginModal from '../modals/LoginModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main> <ToastContainer />
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