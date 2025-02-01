import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import Spinner from "react-bootstrap/Spinner";
import { API_ENDPOINT, LOGIN_ERROR } from "../../utils/Constants";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import rocket from "../assets/rocket.png";

const LoginPage = (props) => {
  const [error, setError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [createUser, setCreateUser] = useState(props.createUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitting(true);
    const userData = {
      username: event.target[0].value, // replace with actual username
      password: event.target[1].value, // replace with actual password
    };

    try {
      if(userData.password.length<8){
        setFormSubmitting(false);
        setError("Make Sure your password has 8 or more character")
        return
      }
      let apiPath = "api/hulchullapp/login/";
      if (createUser) {
        apiPath = "api/hulchullapp/create-user/";
      }
      const response = await fetch(API_ENDPOINT + apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status == "400") {
          setError(LOGIN_ERROR);
        } else if(response.status =="409"){
          setError("409")
        } else if(response.status=="406"){
          setError("Sorry !!! This employee Id is not in our Database")
        }
        else {
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
        <div
          className={`position-relative login-form-container rounded ${
            isAnimating ? "fade-out" : ""
          }`}
        >
          <form
            className="bg-light p-5 rounded shadow-lg text-center"
            onSubmit={handleSubmit}
            style={{ zIndex: 10 }}
          >
            <h2 className="mb-4">
              {createUser ? "lets Create your Account" : "Login"}
            </h2>
            <h5 className="mb-4">
              {createUser
                ? "Please Fill Below Details"
                : "Please Login Using Provided Credentials"}
            </h5>
            <h6 style={{backgroundColor:'lightblue'}}>Username should be your full name <b>Ex:</b> Karthik Reddy Emireddy</h6>

            {error && (
              <Alert key="loginerror" variant="danger">
                {error =="409"?<>User already exists please try <a href="/login">login</a></>:error}
              </Alert>
            )}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
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
                <>{createUser ? "SignUp" : "Login"}</>
              )}
            </button>
            {createUser?<>Do you already have an Account <a href="/login">Login</a> here</>:<>If you are new <a href="/createuser">register</a> here</>}
          </form>

          {/* Rocket Animation */}
        </div>
        <div
          className={`rocket-container ${isAnimating ? "rocket-launch" : ""}`}
        >
          <img src={rocket} alt="Rocket" className="rocket" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
