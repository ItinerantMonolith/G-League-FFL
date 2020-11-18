import React from 'react'

const PlayerDetail = (props) => {
   const { player, week } = props
   const stats = player.stats.find((e) => parseInt(e.week) === parseInt(week))
   return (
      <div className="playerDetail">
         <div className="playerHeader">
            <div className="playerInfo">
               <div>
                  <span className="playerName">{player.name}</span>
                  <span className="playerPos">
                     {' '}
                     ({player.position}/{player.nflTeam})
                  </span>
               </div>
               <div className="infoBlock">
                  <div>
                     <div className="info">
                        <span className="infoLabel">Height: </span>
                        {player.height}
                     </div>
                     <div className="info">
                        <span className="infoLabel">Weight: </span>
                        {player.weight}
                     </div>
                  </div>
                  <div>
                     <div className="info">
                        <span className="infoLabel">College: </span>
                        {player.college}
                     </div>
                     <div className="info">
                        <span className="infoLabel">Experience: </span>
                        { player.experience > 0 ? player.experience : "Rookie" }
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <img src={player.photoURL} alt={player.name} />
            </div>
         </div>
         {stats ? (
            <div className="statsBlock">
               <div className="statRow">
                  <div className="infoLabel">Rushing Yards</div>
                  <div className="stat">{stats.rushYds}</div>
               </div>
               <div className="statRow">
                  <div className="infoLabel">Rushing TDs</div>
                  <div className="stat">{stats.rushTD}</div>
               </div>
               <div className="statRow">
                  <div className="infoLabel">Receiving Yards</div>
                  <div className="stat">{stats.recYds}</div>
               </div>
               <div className="statRow">
                  <div className="infoLabel">Receiving TDs</div>
                  <div className="stat">{stats.recTD}</div>
               </div>
               <div className="statRow">
                  <div className="infoLabel">Passing Yards</div>
                  <div className="stat">{stats.passYds}</div>
               </div>
               <div className="statRow">
                  <div className="infoLabel">Passing TDs</div>
                  <div className="stat">{stats.passTD}</div>
               </div>
               <div className="statRow">
                  <div className="infoLabel">Fumbles</div>
                  <div className="stat">{stats.fumbles}</div>
               </div>
               <div className="statRow">
                  <div className="infoLabel">Interceptions</div>
                  <div className="stat">{stats.interceptions}</div>
               </div>
               <div className="statRow">
                  <div className="infoLabel">Total Points</div>
                  <div className="stat">{stats.points}</div>
               </div>
            </div>
         ) : null}
      </div>
   )
}

export default PlayerDetail
