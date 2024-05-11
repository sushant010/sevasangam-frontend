import './layout.css'
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;