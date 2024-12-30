import { useState } from "react";
import Alert from "react-bootstrap/Alert";

import Spinner from "react-bootstrap/Spinner";
import { API_ENDPOINT, LOGIN_ERROR } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import './login.css'
import rocket from '../../assets/rocket.png'

const LoginPage = (props) => {
  const [error, setError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitting(true);
    const userData = {
      username: event.target[0].value, // replace with actual username
      password: event.target[1].value, // replace with actual password
    };

    try {
      const response = await fetch(API_ENDPOINT + "api/hulchullapp/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status == "400") {
          setError(LOGIN_ERROR);
        } else {
          setError("We are facing some issues please try again Later");
        }
        setFormSubmitting(false);
        setTimeout(() => {
          setError();
        }, 3000);
        // throw new Error("Invalid credentials");
      }

      const data = await response.json();

      if (data.token) {
        // Store the token in sessionStorage
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("isAdmin", data.isadmin);
        setFormSubmitting(false);
        setError();
        setIsAnimating(true);

        // Navigate after animation
        setTimeout(() => {
          props.setRefresh();
          navigate("/");
        }, 2500);
        

        // Optionally, redirect to a protected route
      }
    } catch (error) {
      // setError("We are facing Some issue please try again later")
      setFormSubmitting(false);
    }
  };

  return (
    <>
    
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-login">
      <div className="position-relative login-form-container rounded ">
        <form
          className={`bg-light p-5 rounded shadow-lg text-center ${
            isAnimating ? "fade-out" : ""
          }`}
          onSubmit={handleSubmit}
          style={{ zIndex: 10 }}
        >
          <h2 className="mb-4">Login</h2>
          {error && (
            <Alert key="loginerror" variant="danger">
              {error}
            </Alert>
          )}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
          {formSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Submitting...{" "}
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Rocket Animation */}
        <div className={`rocket-container ${isAnimating ? "rocket-launch" : ""}`}>
          <img
            src={rocket}
            alt="Rocket"
            className="rocket"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
