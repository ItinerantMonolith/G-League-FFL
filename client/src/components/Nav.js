import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/nav.css'

const Nav = () => (
   <div>
      <nav>
         <NavLink activeClassName="nav-active" to="/">
            Standings 
         </NavLink>
         <NavLink activeClassName="nav-active" to="/rules">
            Rules 
         </NavLink>
         <NavLink activeClassName="nav-active" to="/admin">
            Roster Management
         </NavLink>
      </nav>
   </div>
)

export default Nav