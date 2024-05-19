// import { useNavigate } from 'react-router-dom';
import './modals.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/Auth';


const UpdateProfileModal = () => {

  const api = import.meta.env.VITE_API_URL;


  const [auth, setAuth] = useAuth()

  // const Navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: '', phone: '', password: '' })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPassword = credentials.password ? credentials.password : '';
    try {
      const res = await axios.put(`${api}/auth/update/${auth.user._id}`, {
        name: credentials.name,
        phone: credentials.phone,
        password: newPassword
      })
      if (res && res.data.success) {
        toast.success(res.data.message)
        const updatedAuth = { ...auth, user: res.data.user };
        setAuth(updatedAuth);
        localStorage.setItem('auth', JSON.stringify(updatedAuth)); // Update the entire auth object
        closeUpdateProfileModal();
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }

  }

  const closeUpdateProfileModal = () => {
    // Close the modal
    const modal = document.getElementById("updateProfileModal");
    //eslint-disable-next-line
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

  }

  const fetchProfile = async () => {
    setCredentials({ name: auth?.user?.name, phone: auth?.user?.phone })
  }

  useEffect(() => {
    fetchProfile()
  }, [])


  return (

    <>

      <div className="modal fade" id="updateProfileModal" tabIndex={-1} aria-labelledby="updateProfileModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateProfileModalLabel">Update Profile </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb-3">

                <input placeholder='Name' type="text" name='name' onChange={handleChange} value={credentials.name} className="form-control" id="name" aria-describedby="emailHelp" />

              </div>  <p className='text-center mb-2'>OR</p>

              <div className="mb-3">

                <input placeholder='Mobile' type="text" name='phone' onChange={handleChange} value={credentials.phone} className="form-control" id="phone" aria-describedby="emailHelp" />

              </div>
              <p className='text-center mb-2'>OR</p>

              <div className="mb-3">

                <input placeholder='Current Password' type="password" name='cpassword' onChange={handleChange} value={credentials.cpassword} className="form-control" id="cpassword" />
              </div>

              <div className="mb-3">
                <input placeholder='Password' type="password" name='password' onChange={handleChange} value={credentials.password} className="form-control" id="password" />
              </div>



            </div>
            <div className="modal-footer flex-column">
              <button type="button" onClick={handleSubmit} className="m-auto btn btn-theme-primary">Update</button>


            </div>
          </div>
        </div>
      </div>








    </>


    //   to open above modal use --- data-toggle="modal" data-target="#updateProfileModelModal" --- in desired button

  )
}

export default UpdateProfileModal