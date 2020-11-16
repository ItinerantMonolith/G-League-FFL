import React from 'react'

const Confirm = (props) => {
   return (
      <div className="confirm">
         <div><h4>{props.msg}</h4></div>
         <div>
            <button onClick={props.onConfirm}>Yes, Do It!</button>
         </div>
      </div>
   )
}

export default Confirm
