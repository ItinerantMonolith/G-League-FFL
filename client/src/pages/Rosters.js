import React, { Component } from 'react'
import { __GetLeague } from '../services/LeagueService'
import {
   __GetTeamsByWeek,
   __GetRoster,
   __GetPlayer,
} from '../services/RosterService'

import Player from './Player'
import PlayerDetail from './PlayerDetail'
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
         playerDetail: '',
      }
   }

   componentDidMount = async () => {
      await this.loadLeague()
   }

   loadLeague = async () => {
      const leagueInfo = await __GetLeague()

      const teams = await this.refreshTeams(leagueInfo.currentWeek)

      await this.setState({
         maxWeek: leagueInfo.currentWeek,
         viewWeek: leagueInfo.currentWeek,
         teams: teams,
      })
   }

   refreshTeams = async (week) => {
      const roster = await __GetTeamsByWeek(week)
      const teams = []
      roster.sort((a, b) => (a.team.name < b.team.name ? -1 : 1))
      roster.forEach((e) => teams.push(e.team))

      return teams
   }

   changeWeek = async (newWeek) => {
      const teams = await this.refreshTeams(newWeek)

      if (
         this.state.viewTeam &&
         teams.find((e) => e._id === this.state.viewTeam)
      ) {
         this.selectTeam(this.state.viewTeam, newWeek)

         await this.setState({
            viewWeek: newWeek,
            teams: teams,
         })
      }
      else 
      await this.setState({
         viewWeek: newWeek,
         teams: teams,
         viewTeam: null,
         viewPlayer: null
      })
   }

   selectTeam = async (e, week = this.state.viewWeek) => {
      const roster = await __GetRoster(e, week)
      roster.players.sort((a, b) => {
         if (a.sortPos < b.sortPos) return -1
         else if (a.sortPos > b.sortPos) return 1
         else {
            if (a.name < b.name) return -1
            else return 1
         }
      })

      if (
         this.state.viewPlayer &&
         roster.players.find((e) => e._id === this.state.viewPlayer)
      ) {
         this.selectPlayer(this.state.viewPlayer)

         await this.setState({
            players: roster.players,
            viewTeam: e,
         })
      } else
         await this.setState({
            players: roster.players,
            viewTeam: e,
            viewPlayer: null
         })
   }

   selectPlayer = async (e) => {
      // get the player's details and store them, then set viewPlayer
      const player = await __GetPlayer(e)

      await this.setState({
         viewPlayer: e,
         playerDetail: player,
      })
   }

   teamName = (team) => {
      return this.state.teams.find((e) => e._id === team).name
   }

   render() {
      const {
         viewWeek,
         maxWeek,
         viewTeam,
         viewPlayer,
         playerDetail,
      } = this.state

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
                  <PlayerDetail
                     player={playerDetail}
                     week={this.state.viewWeek}
                  />
               ) : null}
            </div>
         </div>
      )
   }
}
