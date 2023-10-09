import React from "react";
import "./Login.css";
import Logo from "../assets/logo.webp";
function Login() {
  return (
    <>
      <div className="all">
        <div className="row main-content bg-success text-center">
          <div className="col-md-4 text-center company__info">
            <span className="company__logo">
              <h2>
                <span className="fa fa-android" />
              </h2>
            </span>
            <div className="company_title">
                <img src={Logo}/>
            </div>
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="row">
              <h2>Log In</h2>
            </div>
            <div className="row">
              <form control className="form-group">
                <div className="row">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form__input"
                    placeholder="Username"
                  />
                </div>
                <div className="row">
                  <span className="fa fa-lock" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form__input"
                    placeholder="Password"
                  />
                </div>
                <div className="row">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    className
                  />
                  <label htmlFor="remember_me">Remember Me!</label>
                </div>
                <div className="row">
                  <input type="submit" defaultValue="Submit" className="btn" />
                </div>
              </form>
            </div>
            <div className="row">
              <p>
                Don't have an account? <a href="#">Register Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
