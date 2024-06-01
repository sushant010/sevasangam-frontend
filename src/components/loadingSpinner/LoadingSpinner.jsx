import HashLoader from "react-spinners/HashLoader";
import './loadingSpinner.css'
import Layout from '../layout/Layout';

const LoadingSpinner = () => {
    return (
        <div className="loader-wrapper">
            <HashLoader color={"#ff395c"} />
        </div>
    )
}

export default LoadingSpinner