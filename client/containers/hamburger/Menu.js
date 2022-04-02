import React from "react";
import { NavLink } from "react-router-dom";

export default ({ close }) => (
  <div className="menu">
    <ul>
      {/* <li>
        <NavLink onClick={close} activeClassName="current" to="/">
          Home
        </NavLink>
      </li> */}
      <li>
        <NavLink onClick={close} activeClassName="current" to="addBank">
          Add Bank
        </NavLink>
      </li>
      <li>
        <NavLink onClick={close} activeClassName="current" to="contributions">
          Contributions
        </NavLink>
      </li>
    </ul>
  </div>
);
