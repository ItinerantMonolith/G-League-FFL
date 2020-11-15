import React, { Component } from 'react'
import { __GetLeague } from '../services/LeagueService'
import { __GetTeamsByWeek, __GetRoster } from '../services/RosterService'

import Player from './Player'
import '../styles/roster.css'

export default class Rosters extends Component {
   constructor() {
      super()
      this.state = {
         viewWeek: 0,
         viewTeam: null,
         viewPlayer: null,
         maxWeek: 0,
         teams: [],
         players: [],
      }
   }

   componentDidMount = async () => {
      await this.loadLeague()
   }

   loadLeague = async () => {
      const leagueInfo = await __GetLeague()

      await this.setState({
         maxWeek: leagueInfo.currentWeek,
         viewWeek: leagueInfo.currentWeek,
      })
      await this.refreshTeams()
   }

   refreshTeams = async () => {
      const roster = await __GetTeamsByWeek(this.state.viewWeek)
      const teams = []
      roster.sort((a, b) => (a.team.name < b.team.name ? -1 : 1))
      roster.forEach((e) => teams.push(e.team))

      console.log(teams)
      await this.setState({ teams: teams })
   }

   changeWeek = async (newWeek) => {
      await this.setState({ viewWeek: newWeek })
   }

   selectTeam = async (e) => {
      const roster = await __GetRoster(e, this.state.viewWeek)
      roster.players.sort((a, b) => {
         if (a.sortPos < b.sortPos) return -1
         else if (a.sortPos > b.sortPos) return 1
         else {
            if (a.name < b.name) return -1
            else return 1
         }
      })

      await this.setState({
         players: roster.players,
         viewPlayer: null,
         viewTeam: e,
      })
   }

   selectPlayer = async (e) => {
      console.log ('selectPlayer', e )
      // get the player's details and store them, then set viewPlayer

      await this.setState({ viewPlayer: e })
   }

   teamName = ( team ) => {
      return this.state.teams.find( e => e._id === team ).name
   }


   render() {
      const { viewWeek, maxWeek, viewTeam, viewPlayer } = this.state
      return (
         <div className="rosters">
            <h2>
               {viewWeek > 4 ? (
                  <span
                     onClick={() => this.changeWeek(viewWeek - 1)}
                     className="changeWeek"
                  >
                     &lt;&lt;
                  </span>
               ) : (
                  <span className="changeWeek"> </span>
               )}
               View Rosters for Week {viewWeek}
               {viewWeek < maxWeek ? (
                  <span
                     onClick={() => this.changeWeek(viewWeek + 1)}
                     className="changeWeek"
                  >
                     &gt;&gt;
                  </span>
               ) : (
                  <span className="changeWeek"> </span>
               )}
            </h2>
            <div className="rosterCenter">
               <div className="teamList">
                  <h3>Select a Team</h3>
                  {this.state.teams.map((e, i) => (
                     <div
                        className="selectMe"
                        key={e._id}
                        onClick={() => this.selectTeam(e._id)}
                     >
                        {e.name}
                     </div>
                  ))}
               </div>
               {viewTeam ? (
                  <div className="playerList">
                     <h3>{this.teamName(this.state.viewTeam)}'s Roster</h3>
                     {this.state.players.map((e) => (
                        <Player
                           player={e}
                           selectPlayer={() => this.selectPlayer(e._id)}
                        />
                     ))}
                  </div>
               ) : null}
               {viewPlayer ? (
                  <PlayerDetail player={viewPlayer} />
               ) : null}
            </div>
         </div>
      )
   }
}

{
   /* <PlayerList week={viewWeek} team={viewTeam} /> : null } */
}
