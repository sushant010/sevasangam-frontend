import "./modals.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { useState } from "react";


const ForgotPasswordModal = () => {


    const api = import.meta.env.VITE_API_URL;
    // const navigate = useNavigate();
    // const location = useLocation();


    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const closeForgotPasswordModal = () => {
        // Close the modal
        const modal = document.getElementById("forgotPasswordBackdrop");
        //eslint-disable-next-line
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${api}/auth/forgot-password`, { email });
            if (res && res.data.success) {
                toast.success(res.data.message);
                closeForgotPasswordModal();
                setEmail('');

            } else {
                toast.error(res.data.error);
            }
        } catch (error) {

            toast.error(error.response.data.message);
        }
    };


    return (
        <div
            className="modal fade"
            id="forgotPasswordBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Forgot Password
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={email}
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                            />
                        </div>


                        {/* <Link className='forgot-pw' to={'/forgot-password'}> Forgot Password</Link> */}
                    </div>
                    <div className="modal-footer flex-column text-center">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="m-auto btn btn-theme-primary"
                        >
                            Send Email to Reset Password
                        </button>






                    </div>
                </div>
            </div>
        </div >

        //   to open above modal use --- data-toggle="modal" data-target="#forgotPasswordModal" --- in desired button
    );
};

export default ForgotPasswordModal;
