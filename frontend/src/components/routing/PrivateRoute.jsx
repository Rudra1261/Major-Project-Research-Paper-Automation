import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  children,
  auth: { isAuthenticated, loading },
  ...rest
}) => (!isAuthenticated && !loading ? <Navigate to="/login" /> : children);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStatesToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStatesToProp)(PrivateRoute);
