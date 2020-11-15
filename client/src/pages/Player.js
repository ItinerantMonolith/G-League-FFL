import React from 'react'

const Player = (props) => {
   
   const { player } = props
   return (
      <div className="player selectMe" key={player._id}>
         <div onClick={props.selectPlayer} >{player.name}</div>
         <div>
            {player.position}/{player.nflTeam}
         </div>
      </div>
   )
}

export default Player
