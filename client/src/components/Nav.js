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
      </nav>
   </div>
)

export default Nav
