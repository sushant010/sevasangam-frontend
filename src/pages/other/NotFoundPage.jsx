import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import Layout from "../../components/layout/Layout";

const NotFoundPage = () => {
    return (

        <Layout>
            <div className="not-found-page">
                <h1>404 - Page Not Found</h1>
                <p>Oops! The page you are looking for does not exist.</p>
                <Link to="/" className="home-link btn btn-theme-primary">
                    Go Back to Home
                </Link>
            </div>
        </Layout>
    );
};

export default NotFoundPage;