import React, { useRef } from "react";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Register = ({ setAlert, register, isAuthenticated }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef?.current?.value;
    const email = emailRef?.current?.value;
    const password = password1Ref?.current?.value;
    const password2 = password2Ref?.current?.value;
    if (password !== password2) {
      setAlert("Passwords don't match", "danger", 3000);
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  return (
    <>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">Create Your account</p>
        <form action="submit" onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" ref={nameRef} />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter email address"
              name="email"
              ref={emailRef}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              ref={password1Ref}
              placeholder="Enter Password"
              name="password1"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm password"
              name="password2"
              ref={password2Ref}
            />
          </div>
          <input type="submit" className="btn btn-primary" />
        </form>
        <p className="my-1">
          Already have an account?
          <Link to="/login">Sign In</Link>
        </p>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStatesToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStatesToProp, { setAlert, register })(Register);
