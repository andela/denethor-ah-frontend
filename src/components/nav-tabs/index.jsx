import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';

const NavTab = () => (
  <div className="nav-tabs">
    <NavLink className="nav-tabs__fashion" to="/">FASHION</NavLink>
    <NavLink className="nav-tabs__politics" to="/politics">POLITICS</NavLink>
    <NavLink className="nav-tabs__health" to="/health">HEALTH</NavLink>
    <NavLink className="nav-tabs__education" to="/education">EDUCATION</NavLink>
    <NavLink className="nav-tabs__wellness" to="/wellness">WELLNESS</NavLink>
    <NavLink className="nav-tabs__tech" to="/tech">TECH</NavLink>
    <NavLink className="nav-tabs__design" to="/design">DESIGN</NavLink>
    <Link className="nav-tabs__signup" to="/signup">SIGNUP</Link>
    <Link className="nav-tabs__login" to="/login">LOGIN</Link>
  </div>
);

export default withRouter(NavTab);
