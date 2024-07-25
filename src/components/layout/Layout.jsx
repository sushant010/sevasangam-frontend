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
import { Helmet } from 'react-helmet';
function Layout({ children, title = 'SevaSangam', description = 'SevaSangam is a visionary platform dedicated to facilitating spiritual connections and supporting temples through seamless digital solutions.' }) {

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
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
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    description: PropTypes.string
};

export default Layout;