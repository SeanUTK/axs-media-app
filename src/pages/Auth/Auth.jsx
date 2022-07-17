import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

import Logo from "../../img/logo.png";
import "./Auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(true);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div>
      <div className="Auth">
        <div className="a-left">
          <img src={Logo} alt="" />
          <div className="Webname">
            <h1>AXS Media</h1>
            <h6>Explore the idea throughout the world</h6>
          </div>
        </div>
        {/* Right Side */}
        <div className="a-right">
          <form className="infoForm authForm" onSubmit={handleSubmit}>
            <i></i>

            {isSignUp && (
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  onChange={handleChange}
                  value={data.firstname}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  onChange={handleChange}
                  name="lastname"
                  value={data.lastname}
                />
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="UserName"
                className="infoInput"
                onChange={handleChange}
                name="username"
                value={data.username}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="infoInput"
                onChange={handleChange}
                name="password"
                value={data.password}
              />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="infoInput"
                  onChange={handleChange}
                  name="confirmpass"
                  value={data.confirmpass}
                />
              )}
            </div>
            <span
              style={{
                display: confirmPass ? "none" : "block",
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              * Confirm Password is not same
            </span>

            <button
              className="button infoButton"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "Sign up" : "Log in"}
            </button>
            {isSignUp ? (
              <div className="auth-divider">
                <hr className="sign-up-hr" />
                <p className="or">or</p>
                <hr className="sign-up-hr" />
              </div>
            ) : (
              <div className="auth-divider">
                <hr className="log-in-hr" />
                <p className="or">or</p>
                <hr className="log-in-hr" />
              </div>
            )}

            <div>
              <button
                className="button infoButton2"
                onClick={() => {
                  setIsSignUp((prev) => !prev);
                  resetForm();
                }}
              >
                {isSignUp ? "Already have an account?" : "Create new account"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="copyright">
        <p>AXS MEDIA © 2022</p>
        <p>ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default Auth;
