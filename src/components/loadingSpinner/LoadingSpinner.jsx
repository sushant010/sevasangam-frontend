import HashLoader from "react-spinners/HashLoader";
import './loadingSpinner.css';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ text = '' }) => {
    return (
        <div className="loader-wrapper d-flex flex-column">
            <HashLoader color={"#ff395c"} />
            <p className="mt-2 fw-bold text-center text-grey-dark">{text}</p>
        </div>
    )
}

export default LoadingSpinner

LoadingSpinner.propTypes = {
    text: PropTypes.string
}