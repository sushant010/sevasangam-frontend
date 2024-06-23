import './modals.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import compress from 'compress-base64'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const UpdateProfileModal = () => {
  const api = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useAuth();
  const [credentials, setCredentials] = useState({ name: '', phone: '' });
  const [avatar, setAvatar] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value || '' });
  };

  // const handleFileChange = (e) => {
  //   setAvatar(e.target.files[0]);
  // };

  const phoneNumChange = (value) => {
    setCredentials({ ...credentials, phone: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', credentials.name);
    formData.append('phone', credentials.phone);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const res = await axios.put(`${api}/auth/update/${auth.user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        const updatedAuth = { ...auth, user: res.data.user };
        setAuth(updatedAuth);
        localStorage.setItem('auth', JSON.stringify(updatedAuth)); // Update the entire auth object
        closeUpdateProfileModal();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeUpdateProfileModal = () => {
    const modal = document.getElementById('updateProfileModal');
    {/* eslint-disable-next-line */ }
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  };

  const fetchProfile = async () => {
    setCredentials({ name: auth?.user?.name, phone: auth?.user?.phone });
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        compress(event.target.result,
          {
            width: 400, // Increased width for better details
            type: 'image/jpeg',
            max: 50, // Increased max size to allow for higher quality
            min: 10,  // Decreased min size to allow for smaller file sizes
            quality: 0.95, // Adjusted quality to improve image fidelity
          },
          {
            width: 400, // Increased width for better details
            type: 'image/png',
            max: 50, // Increased max size to allow for higher quality
            min: 10,  // Decreased min size to allow for smaller file sizes
            quality: 0.95, // Adjusted quality to improve image fidelity
          },
          {
            width: 400, // Increased width for better details
            type: 'image/webp',
            max: 50, // Increased max size to allow for higher quality
            min: 10,  // Decreased min size to allow for smaller file sizes
            quality: 0.95, // Adjusted quality to improve image fidelity
          },
        ).then(result => {
          console.log(result)
          setAvatar(result)
        })
      }
      resolve(fileReader.readAsDataURL(file))
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    try {
      setAvatarLoading(true);
      await convertToBase64(file);
    } catch (error) {
      console.log(error);
    } finally {
      setAvatarLoading(false);
    }
  };



  // end of image upload

  useEffect(() => {
    fetchProfile();
  }, [auth]);

  return (
    <>
      <div className="modal fade" id="updateProfileModal" tabIndex={-1} aria-labelledby="updateProfileModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateProfileModalLabel">Update Profile</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <input placeholder="Name" type="text" name="name" onChange={handleChange} value={credentials.name || ''} className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <PhoneInput placeholder='Mobile' value={credentials.phone || ''} onChange={phoneNumChange} defaultCountry="IN" className="form-control input-form-control" international />
              </div>
              {/* <div className="mb-3">
              <input placeholder="Password" type="password" name="password" onChange={handleChange} value={credentials.password} className="form-control" id="password" />
            </div> */}
              <div className="mb-3">
                <a
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "var(--color-theme-primary)",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#forgotPasswordBackdrop"
                >
                  Change Password
                </a>
              </div>
              <label htmlFor="avatar" className="form-label">Avatar Image</label>
              <label htmlFor="avatar" className='d-block custom-file-upload mb-2'>
                <div style={{ width: "60px", height: "60px", borderRadius: "50px", overflow: "hidden" }}>
                  <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={avatar || auth?.user?.avatar} alt="" />
                </div>
              </label>

              <input
                type="file"
                label="avatar"
                name="avatar"
                id='avatar'
                className="form-control"
                accept='.jpeg, .png, .jpg'
                onChange={(e) => handleFileUpload(e)}
              />



            </div>
            <div className="modal-footer flex-column">
              <button type="button" onClick={handleSubmit} className="m-auto btn btn-theme-primary">Update</button>
            </div>
          </div>
        </div>
      </div>
      {avatarLoading && <LoadingSpinner text="Have Patience, Loading your image." />}
    </>
  );
};

export default UpdateProfileModal;
