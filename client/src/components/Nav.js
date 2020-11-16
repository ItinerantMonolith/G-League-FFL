import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
   <div>
      <nav>
         <NavLink activeClassName="nav-active" to="/">
            Standings
         </NavLink>
         <NavLink activeClassName="nav-active" to="/rosters">
            Rosters
         </NavLink>
         <NavLink activeClassName="nav-active" to="/rules">
            Rules
         </NavLink>
         <NavLink activeClassName="nav-active" to="/admin">
            Admin
         </NavLink>
         <NavLink activeClassName="nav-active" to="/login">
            Sign In
         </NavLink>
      </nav>
   </div>
)

export default Nav
