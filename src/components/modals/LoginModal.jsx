import "./modals.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/Auth";
import { useState } from "react";
import OauthGoogle from "../OauthGoogle";
import zod from "zod";

const schema = zod.object({
  email: zod
    .string({
      message: "Invalid email address.",
    })
    .email({
      message: "Invalid email address.",
    }),
  password: zod.string().min(6, {
    message: "Password must be atleast 6 characters long.",
  }),
});

const LoginModal = () => {
  const api = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const closeLoginModal = () => {
    // Close the modal
    const modal = document.getElementById("loginBackdrop");
    //eslint-disable-next-line
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    //validate the form

    try {
      schema.parse(credentials);
      
    } catch (error) {
      // error.errors.map((err) => toast.error(err));
      error.errors.forEach(element => {
        toast.error(element.message);
      });
      const errorMessage = error.errors.map((err) => err.message).join(" ");
      console.log(errorMessage);
      setLoginError(errorMessage);
      return;
    }

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
        // closeLoginModal();
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
          {/* //login error message */}

          {loginError && (
            <div className="alert alert-danger" role="alert">
              {loginError}
            </div>
          )}
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
          <div className="modal-footer flex-column text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="m-auto btn btn-theme-primary"
            >
              Login
            </button>
            <div>
              <a
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "var(--color-theme-primary)",
                }}
                data-bs-toggle="modal"
                data-bs-target="#forgotPasswordBackdrop"
              >
                Forgot Password
              </a>
            </div>

            <div
              style={{ borderTop: "1px solid #eee" }}
              className="text-muted text-center mt-3 pt-2 w-100"
            >
              {" "}
              New to SevaSangam?
            </div>

            <OauthGoogle closeLoginModal={closeLoginModal}></OauthGoogle>
            <p className="text-muted fw-bold text-center my-2 ">
              <small>OR</small>
            </p>
            <div>
              <a
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "var(--color-theme-primary)",
                }}
                data-bs-toggle="modal"
                data-bs-target="#signupBackdrop"
              >
                Register Now
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
