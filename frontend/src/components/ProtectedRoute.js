import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  return (
    props.isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace/>
  )
}

export default ProtectedRoute;

