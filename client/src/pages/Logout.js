import React from 'react'

const Logout = (props) => {
   return (
      <div className="logout">
         <div>Do you really want to log out?</div>
         <div>
            <button onClick={props.logMeOut}>Yes, Log Me Out!</button>
         </div>
      </div>
   )
}

export default Logout
