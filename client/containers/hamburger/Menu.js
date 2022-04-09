import React from "react";
import { NavLink } from "react-router-dom";

export default (props) => (
  
  <div className="menu">
  <button className="buttonNav" onClick={(e) => {
    e.preventDefault()
    props.logout(e)}}>signout</button>
  </div>
);
