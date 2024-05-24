// import { useNavigate } from 'react-router-dom';
import './modals.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import OauthGoogle from '../OauthGoogle';
import zod from 'zod';

const schema = zod.object({
  name: zod.string().min(3, { message: 'Name must be atleast 3 characters long' }),
  email: zod.string().email({ message: 'Invalid email address' }),
  phone: zod.string().min(10, { message: 'Phone number must be atleast 10 characters long' }),
  password: zod.string().min(6, { message: 'Password must be atleast 6 characters long' }),
});


const SignupModal = () => {

  const api = import.meta.env.VITE_API_URL;
  const [registerError, setRegisterError] = useState('');

  // const Navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', email: '', phone: '', password: '' })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      schema.parse(credentials);
    } catch (error) {
      
      error.errors.forEach(element => {
        toast.error(element.message);
      });
      const errorMessage = error.errors.map((err) => err.message).join(" ");
      setRegisterError(errorMessage);
      return;
    }
    // check if password and confirm password match
    if (credentials.password !== credentials.cpassword) {
      toast.error('Passwords do not match')
      setRegisterError('Passwords do not match')
      return;
    }
    try {
      const res = await axios.post(`${api}/auth/register`, {
        name: credentials.name,
        email: credentials.email,
        phone: credentials.phone,
        password: credentials.password
      })
      if (res && res.data.success) {
        toast.success(res.data.message)
        closeSignupModal();
        setCredentials({ name: '', email: '', phone: '', password: '' })
        // Navigate('/login')

      } else {
        // toast.error(res.data.message)
        // console.log('something went wrong')
        toast.error(res.data.error)
      }
      setCredentials({ ...credentials, [e.target.name]: '' });
    } catch (error) {
      console.log(error)
    }

  }

  const closeSignupModal = () => {
    // Close the modal
    const modal = document.getElementById("signupBackdrop");
    //eslint-disable-next-line
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

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
          {registerError && <div className="alert alert-danger">{registerError}</div>}
          <div className="modal-body">
            <div className="mb-3">

              <input placeholder='Name' type="text" name='name' onChange={handleChange} value={credentials.name} className="form-control" id="name" aria-describedby="emailHelp" />

            </div>
            <div className="mb-3">

              <input placeholder='Email' type="email" name='email' onChange={handleChange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" />

            </div>
            <div className="mb-3">

              <input placeholder='Mobile' type="text" name='phone' onChange={handleChange} value={credentials.phone} className="form-control" id="phone" aria-describedby="emailHelp" />

            </div>
            <div className="mb-3">

              <input placeholder='Password' type="password" name='password' onChange={handleChange} value={credentials.password} className="form-control" id="password" />
            </div>
            <div className="mb-3">

              <input placeholder='Confirm Password' type="password" name='cpassword' onChange={handleChange} value={credentials.cpassword} className="form-control" id="cpassword" />
            </div>


          </div>
          <div className="modal-footer flex-column">
            <button type="button" onClick={handleSubmit} className="m-auto btn btn-theme-primary">Signup</button>


          </div>

        </div>
      </div>
    </div>







    //   to open above modal use --- data-toggle="modal" data-target="#signupModal" --- in desired button

  )
}

export default SignupModal