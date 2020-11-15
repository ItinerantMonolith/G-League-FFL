import React, { Component } from 'react'
import {
   __GetNFLTeams,
   __GetTeams,
   __GetRoster,
   __GetAvailablePlayers,
   __AddPlayerToRoster,
} from '../services/RosterService'

export default class AddPlayer extends Component {
   constructor() {
      super()

      this.state = {
         nflTeams: [],
         teams: [],
         selectedTeam: '',
         selectedNFLTeam: '',
         selectedPosition: 'QB',
         selectedPlayer: '',
         roster: [],
         availablePlayers: [],
      }
   }

   componentDidMount = async () => {
      // need to get the league and then the current round to see what teams are still around
      await this.loadTeams()
      await this.refreshRoster()
      await this.refreshPlayers()
   }

   loadTeams = async () => {
      const nflTeams = await __GetNFLTeams()

      const teams = await __GetTeams(this.props.round)

      teams.sort((a, b) => (a.team.name < b.team.name ? -1 : 1))
      await this.setState({
         nflTeams: nflTeams,
         teams: teams,
         selectedNFLTeam: nflTeams[0]._id,
         selectedTeam: teams[0].team._id,
      })
   }

   refreshRoster = async () => {
      const res = await __GetRoster(this.state.selectedTeam, this.props.week)

      res.players.sort((a, b) => {
         if (a.sortPos < b.sortPos) return -1
         else if (a.sortPos > b.sortPos) return 1
         else {
            if (a.name < b.name) return -1
            else return 1
         }
      })
      await this.setState({ roster: res.players, roster_id: res._id })
   }

   handleSelectTeam = async (e) => {
      await this.setState({
         selectedTeam: e.target.value,
      })
      await this.refreshRoster()
   }

   refreshPlayers = async () => {
      const res = await __GetAvailablePlayers(
         this.state.selectedNFLTeam,
         this.state.selectedPosition
      )
      res.sort((a, b) => (a.name < b.name ? -1 : 1))
      await this.setState({
         availablePlayers: res,
         selectedPlayer: res[0]._id,
      })
   }

   handleNFLTeam = async (e) => {
      await this.setState({
         selectedNFLTeam: e.target.value,
      })
      await this.refreshPlayers()
   }

   handlePosition = async (e) => {
      await this.setState({
         selectedPosition: e.target.value,
      })
      await this.refreshPlayers()
   }

   handlePlayerToAdd = async (e) => {
      await this.setState({
         selectedPlayer: e.target.value,
      })
   }

   addPlayerToRoster = async () => {
      await __AddPlayerToRoster(this.state.roster_id, this.state.selectedPlayer)

      await this.refreshRoster()
   }

   render() {
      return (
         <div>
            <h2>Add Players</h2>
            <label htmlFor="selTeam">Select a Team </label>
            <select id="selTeam" onChange={this.handleSelectTeam}>
               {this.state.teams.map((e) => (
                  <option value={e.team._id} key={e.team_id}>
                     {e.team.name}
                  </option>
               ))}
            </select>
            <div className="rosterDisplay">
               {this.state.roster.map((e) => (
                  <div className="player">
                     <div>{e.name}</div>
                     <div>
                        {e.position}/{e.nflTeam}
                     </div>
                  </div>
               ))}
            </div>
            <div>
               <label>From NFL Team</label>
               <select onChange={this.handleNFLTeam}>
                  {this.state.nflTeams.map((e) => (
                     <option value={e._id} key={e._id}>
                        {e.name}
                     </option>
                  ))}
               </select>
            </div>
            <div>
               <label>Select Position</label>
               <select onChange={this.handlePosition}>
                  {['QB', 'RB', 'WR', 'TE'].map((e) => (
                     <option value={e} key={e}>
                        {e}
                     </option>
                  ))}
               </select>
            </div>
            <div>
               <label>Select Player</label>
               <select onChange={this.handlePlayerToAdd}>
                  {this.state.availablePlayers.map((e) => (
                     <option value={e._id} key={e._id}>
                        {e.name}
                     </option>
                  ))}
               </select>
            </div>
            <button onClick={this.addPlayerToRoster}>
               Add Selected Player to Roster
            </button>
         </div>
      )
   }
}
