import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import zod, { set } from 'zod';
import { useAuth } from "../../context/Auth";
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import "./signupmodel.css";


const schema = zod.object({
  name: zod.string().min(3, { message: 'Name must be at least 3 characters long' }),
  email: zod.string().email({ message: 'Invalid email address' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters long' }),
  otp: zod.string().min(1, { message: 'OTP must be at least 1 character long' }),
});

const SignupModal = () => {
  const api = import.meta.env.VITE_API_URL;
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ name: '', email: '', phone: '', password: '', otpToken: null, otp: '' });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef();
  const [allInputValid, setAllInputValid] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (
      nameError === '' && emailError === '' && phoneError === '' && passwordError === '' && cpasswordError === '' && otpError === '' && e.target.value !== ''
    ) {
      setAllInputValid(true);
    }

  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setCpasswordError('');
    setOtpError('');

    try {
      schema.parse(credentials);
    } catch (error) {
      error.errors.forEach(err => {
        const message = err.message;
        const path = err.path[0];
        if (path === 'name') setNameError(message);
        if (path === 'email') setEmailError(message);
        if (path === 'phone') setPhoneError(message);
        if (path === 'password') setPasswordError(message);
        if (path === 'otp') setOtpError(message);
      });
      return;
    }

    if (credentials.password !== credentials.cpassword) {
      setCpasswordError('Passwords do not match');
      return;
    }

    if (credentials.phone === "" || !isValidPhoneNumber(credentials.phone)) {
      setPhoneError('Invalid phone number');
      return;
    }

    setFormSubmitLoading(true);
    setLoading(true);

    const formData = new FormData();
    formData.append('name', credentials.name);
    formData.append('email', credentials.email);
    formData.append('phone', credentials.phone);
    formData.append('password', credentials.password);
    formData.append('otpToken', credentials.otpToken);
    formData.append('otp', credentials.otp);
    if (avatar) formData.append('avatar', avatar);

    try {
      const res = await axios.post(`${api}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        closeSignupModal();
        setLoading(false);
        toast.success(res.data.message);

        setCredentials({ name: '', email: '', phone: '', password: '', otpToken: null, otp: '' });
        setAvatar(null);

        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem('auth', JSON.stringify(res.data));

        const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem('tokenExpiration', expirationTime);

      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setFormSubmitLoading(false);
      setLoading(false);
      closeSignupModal()
    }
  };

  // const closeSignupModal = () => {
  //   const modal = document.getElementById("signupBackdrop");
  //   const modalInstance = bootstrap.Modal.getInstance(modal);
  //   modalInstance.hide();
  // };

  const closeSignupModal = () => {
    if (modalRef.current) {
      //eslint-disable-next-line
      const modalInstance = new bootstrap.Modal(modalRef.current);
      modalInstance.hide();
    }
  };

  const phoneNumChange = (value) => {
    setCredentials({ ...credentials, phone: value });
  };

  const sendOtp = async () => {
    setSendOtpLoading(true);
    try {
      const res = await axios.post(`${api}/auth/otp-to-register`, {
        email: credentials.email
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setOtpSent(true);
        setCredentials({ ...credentials, otpToken: res.data.otpToken });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setSendOtpLoading(false);
    }
  };


  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="modal fade" id="signupBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" ref={modalRef} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Signup</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <input placeholder='Email' type="email" name='email' onChange={handleChange} value={credentials.email} className="form-control" id="email" />
                {emailError && <p className="text-danger mt-1">{emailError}</p>}
              </div>
              {otpSent ? (
                <div className="mb-3">
                  <button type="button" className="btn btn-theme-primary" onClick={sendOtp}>{sendOtpLoading ? "Sending..." : "Re-Send OTP"}</button>
                </div>
              ) : (
                <div className="mb-3">
                  <button type="button" className="btn btn-theme-primary" onClick={sendOtp}>{sendOtpLoading ? "Sending..." : "Send OTP"}</button>
                </div>
              )}
              {otpSent && (
                <>
                  <div className="mb-3">
                    <input placeholder='OTP' type="text" name='otp' onChange={handleChange} value={credentials.otp} className="form-control" id="otp" />
                    {otpError && <p className="text-danger mt-1">{otpError}</p>}
                  </div>
                  <div className="mb-3">
                    <input placeholder='Name' type="text" name='name' onChange={handleChange} value={credentials.name} className="form-control" id="name" />
                    {nameError && <p className="text-danger mt-1">{nameError}</p>}
                  </div>
                  <div className="mb-3">
                    <PhoneInput placeholder='Mobile' value={credentials.phone} onChange={phoneNumChange} defaultCountry="IN" className="form-control input-form-control" international />
                    {phoneError && <p className="text-danger mt-1">{phoneError}</p>}
                  </div>
                  <div style={{ position: "relative" }} className=" mb-3 d-flex  password-form-control">
                    <input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      value={credentials.password}
                      className="form-control"
                      id="password"
                    />
                    <span style={{
                      position: "absolute",
                      right: "4px",
                      top: "50%",
                      transform: "translateY(-50%)"
                    }} className="text-primary password-eye-icon px-2 d-flex align-items-center justify-content-center">
                      {showPassword ? (
                        <i
                          className="fa-solid fa-eye-slash"
                          onClick={() => setShowPassword(!showPassword)}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-eye"
                          onClick={() => setShowPassword(!showPassword)}
                        ></i>
                      )}
                    </span>
                  </div>
                  <div className="mb-3">
                    <input placeholder='Confirm Password' type="password" name='cpassword' onChange={handleChange} value={credentials.cpassword} className="form-control" id="cpassword" />
                    {cpasswordError && <p className="text-danger mt-1">{cpasswordError}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">Avatar Image</label>
                    <input type="file" name="avatar" onChange={handleFileChange} className="form-control" />
                  </div>
                </>
              )}
            </div>
            {otpSent && (
              <div className="modal-footer flex-column">
                {formSubmitLoading ? (
                  <button type="button" className="m-auto btn btn-theme-primary">Sending...</button>
                ) : (
                  <button type="button" onClick={handleSubmit} className="m-auto btn btn-theme-primary">Signup</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>


    </>
  );
};

export default SignupModal;