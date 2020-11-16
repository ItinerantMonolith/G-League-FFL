import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({authenticated, currentTeam}) => (
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
         {currentTeam && currentTeam.asA ? (
            <NavLink activeClassName="nav-active" to="/admin">
               Admin
            </NavLink>
         ) : null}
         { authenticated ? (
            <NavLink  activeClassName="nav-active" to="/password">Update Password</NavLink>
         ) : null }
         { authenticated ? (
            <NavLink activeClassName="nav-active" to="/logout">Log Out</NavLink>
         ) : (
         <NavLink activeClassName="nav-active" to="/login">
            Sign In
         </NavLink>
         )}
      </nav>
   </div>
)

export default Nav
