import React from 'react';
import { NavLink } from 'react-router-dom';

const Header=()=>{
    return(
        <div>
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">

<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav mr-auto">
    <li className="nav-item ">
      <NavLink className="nav-link" to="/" >Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/usertype">User Type</NavLink>
    </li>
    <li className="nav-item ">
      <NavLink className="nav-link" to="/paymenttype" >Payment Type</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/producttype">Product Type</NavLink>
    </li>
     <li className="nav-item">
    <NavLink className="nav-link" to="/customer">Customer</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/product">product</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/tax">Tax </NavLink>
    </li>
  </ul>
  
</div>
</header>
         </div>
    )
}
export default Header;