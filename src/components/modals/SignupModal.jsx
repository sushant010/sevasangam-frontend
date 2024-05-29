// import { useNavigate } from 'react-router-dom';
import './modals.css';
import "./signupmodel.css"
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import OauthGoogle from '../OauthGoogle';
import { useAuth } from "../../context/Auth";

import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import zod, { set } from 'zod';
import { useNavigate } from 'react-router-dom';

const schema = zod.object({
  name: zod.string().min(3, { message: 'Name must be atleast 3 characters long' }),
  email: zod.string().email({ message: 'Invalid email address' }),
  // phone: zod.string().min(10, { message: 'Phone number must be atleast 10 characters long' }),
  password: zod.string().min(6, { message: 'Password must be atleast 6 characters long' }),
  otp: zod.string().min(1, { message: 'OTP must be atleast 6 characters long' }),
});


const SignupModal = () => {

  const api = import.meta.env.VITE_API_URL;
  // const [registerError, setRegisterError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');
  const [otpError, setOtpError] = useState('')
  const [otpSent, setOtpSent] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [formSubmitLoading,setFormSubmitLoading] = useState(false)
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()


  // const Navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', email: '', phone: '', password: '', otpToken: null,otp:""})

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setCpasswordError('');
    try {
      console.log(credentials)
      schema.parse(credentials);
    } catch (error) {
      console.log(error.errors)
      
      //fetch all errors
      error.errors.forEach(err => {
        const message = err.message;
        const path = err.path[0];
        if (path === 'name') {
          setNameError(message);
        }
        if (path === 'email') {
          setEmailError(message);
        }
        if (path === 'phone') {
          setPhoneError(message);
        }
        if (path === 'password') {
          setPasswordError(message);
        }
        if(path === 'otp'){
          setOtpError(message);
        }

      });

      return;
    }
    // check if password and confirm password match
    if (credentials.password !== credentials.cpassword) {
      
      setCpasswordError('Passwords do not match');
      return;
    }
    console.log()
    if(credentials.phone === "" || isValidPhoneNumber(credentials.phone) === false){
      setPhoneError('Invalid phone number');
      return;
    }
    setFormSubmitLoading(true)
    try {
      const res = await axios.post(`${api}/auth/register`, {
        name: credentials.name,
        email: credentials.email,
        phone: credentials.phone,
        password: credentials.password,
        otpToken: credentials.otpToken,
        otp: credentials.otp
      })
      if (res && res.data.success) {
        toast.success(res.data.message)
        closeSignupModal();
        setCredentials({ name: '', email: '', phone: '', password: '' })
        
        //auto signin 
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/");

      } else {
        toast.error(res.data.error)
      }
      setCredentials({ ...credentials, [e.target.name]: '' });
    } catch (error) {
      console.log(error)
    } finally{
      setFormSubmitLoading(false)
    }

  }

  const closeSignupModal = () => {
    // Close the modal
    const modal = document.getElementById("signupBackdrop");
    //eslint-disable-next-line
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

  }

  const phoneNumChange = (value) => {
    setCredentials({ ...credentials, phone: value });
  }

  const sendOtp = async () => {
    setSendOtpLoading(true);
    try {
      const res = await axios.post(`${api}/auth/otp-to-register`, {
        email: credentials.email
      });
      if (res && res.data.success) {
        toast.success(res.data.message);

        setOtpSent(true);
        const token = res.data.otpToken;
        setCredentials({ ...credentials, otpToken: token });
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      if(error.response){
        // console.log(error.response)
        toast.error(error.response.data.message);
        return;
      }

      toast.error("Something Error Happened")

    } finally{
    setSendOtpLoading(false);

    }
  }




  return (
    <div className="modal fade" id="signupBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Signup</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          {/* Error message container */}
          {/* {registerError && <div className="alert alert-danger">{registerError}</div>} */}
          <div className="modal-body">
          <div className="mb-3">

            <input placeholder='Email' type="email" name='email' onChange={handleChange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" />
            {emailError && <p className="text-danger mt-1">{emailError}</p>}

          </div>

          {/* send otp button */}
          
          {
            otpSent ? (
              <div className="mb-3">
                <button type="button" className="btn btn-theme-primary"  onClick={sendOtp}>{sendOtpLoading ? "Sending..." : "Re-Send OTP"}</button>
              </div>
            ) :
            <div className="mb-3">
              <button type="button" className="btn btn-theme-primary" onClick={sendOtp}>{sendOtpLoading ? "Sending..." : "Send OTP"}</button>
            </div>
          }
          {
            otpSent && (<>
          {/* otp container */}
          <div className="mb-3">
            <input placeholder='OTP' type="text" name='otp' onChange={handleChange} value={credentials.otp} className="form-control" id="otp" aria-describedby="emailHelp" />
            {otpError && <p className="text-danger mt-1">{otpError}</p>}
          </div> 

            <div className="mb-3">

              <input placeholder='Name' type="text" name='name' onChange={handleChange} value={credentials.name} className="form-control" id="name" aria-describedby="emailHelp" />
             {nameError && <p className="text-danger mt-1">{nameError}</p>}

            </div>
            
            <div className="mb-3">

              {/* <input placeholder='Mobile' type="text" name='phone' onChange={handleChange} value={credentials.phone} className="form-control" id="phone" aria-describedby="emailHelp" /> */}
              <PhoneInput

                placeholder='Mobile'
                value={credentials.phone}
                onChange={phoneNumChange}
                defaultCountry="IN"
                className="form-control input-form-control"
                international
                // withCountryCallingCode
              />
              {phoneError && <p className="text-danger mt-1">{phoneError}</p>}
            </div>
            <div className="mb-3">

              <input placeholder='Password' type="password" name='password' onChange={handleChange} value={credentials.password} className="form-control" id="password" />
              {passwordError && <p className="text-danger mt-1">{passwordError}</p>}
            </div>
            <div className="mb-3">

              <input placeholder='Confirm Password' type="password" name='cpassword' onChange={handleChange} value={credentials.cpassword} className="form-control" id="cpassword" />
              {cpasswordError && <p className="text-danger mt-1">{cpasswordError}</p>}
            </div>
            </>)
        }


          </div>
          {/* <div className="modal-footer flex-column">
            <button type="button" onClick={handleSubmit} className="m-auto btn btn-theme-primary">Signup</button>


          </div> */}
          {
            otpSent && (
              <div className="modal-footer flex-column">

                {
                  formSubmitLoading ? 
                  <button type='button' className="m-auto btn btn-theme-primary">Sending...</button> 
                  :
                 <button type="button" onClick={handleSubmit} className="m-auto btn btn-theme-primary">Signup</button> 

                }

              </div>
            )
          }
          

        </div>
      </div>
    </div>







    //   to open above modal use --- data-toggle="modal" data-target="#signupModal" --- in desired button

  )
}

export default SignupModal