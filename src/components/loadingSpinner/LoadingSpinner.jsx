import { ThreeDots } from 'react-loader-spinner';
import './loadingSpinner.css'

const LoadingSpinner = () => {
    return (

        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="var(--color-theme-primary)"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="custom-spinner"
        />

    )
}

export default LoadingSpinner