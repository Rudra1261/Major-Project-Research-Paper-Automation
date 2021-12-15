import React, { useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {login} from '../../actions/auth'
import PropTypes from "prop-types";
const Login = ({ login, isAuthenticated }) => {
  const passwordRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    login(email, password);
  };
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  return (
    <>
      <h1 className="large text-primary my-3">Sign In</h1>
      <p className="lead">Sign Into your account</p>
      <form action="" onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="email"
            required
            placeholder="Email address"
            className="email"
            ref={emailRef}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            ref={passwordRef}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to="/register"> Sign Up </Link>
      </p>
    </>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStatesToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatesToProp, { login })(Login);
