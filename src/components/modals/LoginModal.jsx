import "./modals.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { useState } from "react";

const LoginModal = () => {
  const api = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      });
      if (res && res.data.success) {
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data.message);
        navigate(location.state || "/");
        // Close the modal
        const modal = document.getElementById("loginBackdrop");

        //eslint-disable-next-line
        const modalInstance = bootstrap.Modal.getInstance(modal);

        modalInstance.hide();
        setCredentials({ email: "", password: "" });
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="loginBackdrop"
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
              Login
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
                value={credentials.email}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={credentials.password}
                className="form-control"
                id="password"
              />
            </div>

            {/* <Link className='forgot-pw' to={'/forgot-password'}> Forgot Password</Link> */}
          </div>
          <div className="modal-footer flex-column">
            <button
              type="button"
              onClick={handleSubmit}
              className="m-auto btn btn-theme-primary"
            >
              Login
            </button>
            <br></br>
            <div>
              New to SevaSangam?{" "}
              <a
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "var(--color-theme-primary)",
                }}
                data-bs-toggle="modal"
                data-bs-target="#signupBackdrop"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    //   to open above modal use --- data-toggle="modal" data-target="#loginModal" --- in desired button
  );
};

export default LoginModal;
