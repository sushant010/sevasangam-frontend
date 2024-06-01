import './layout.css'
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignupModal from '../modals/SignupModal';
import LoginModal from '../modals/LoginModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProfileModal from '../modals/UpdateProfileModal';
import ForgotPasswordModal from '../modals/ForgotPassword';
function Layout({ children }) {

    return (
        <>
            <Navbar />
            <main style={{ position: "relative" }} className='d-flex flex-column'>{children}</main> <ToastContainer theme="colored" position="top-right"
            />
            <Footer />
            <SignupModal></SignupModal>
            <LoginModal></LoginModal>
            <UpdateProfileModal></UpdateProfileModal>
            <ForgotPasswordModal />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;