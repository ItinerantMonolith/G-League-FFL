import React, { Component } from 'react'
import {
   __GetRoster,
   __GetTeams,
   __DropPlayerFromRoster
} from '../services/RosterService'

export default class DropPlayer extends Component {
   constructor() {
      super()
      this.state = {
         teams: [],
         selectedTeam: '',
         roster: [],
         roster_id: '',
         selectedPlayer: ''
      }

   }

   componentDidMount = async () => {
      // need to get the league and then the current round to see what teams are still around
      await this.loadTeams()
      await this.refreshRoster()
   }

   loadTeams = async () => {
      const teams = await __GetTeams(this.props.round)

      await this.setState({
         teams: teams,
         selectedTeam: teams[0].team._id,
      })
   }

   refreshRoster = async () => {
      const res = await __GetRoster(this.state.selectedTeam, this.props.week)

      res.players.sort ( (a, b) => {
         if ( a.sortPos < b.sortPos )
            return -1
         else if ( a.sortPos > b.sortPos )
            return 1
         else {
            if ( a.name < b.name ) 
               return -1
            else 
               return 1
         }
      })
      await this.setState({ roster: res.players, roster_id: res._id, selectedPlayer: res.players[0]._id })
   }

   handleSelectTeam = async (e) => {
      await this.setState({
         selectedTeam: e.target.value,
      })
      await this.refreshRoster()
   }

   handleSelectPlayer = async (e) => {
      await this.setState({
         selectedPlayer: e.target.value
      })
   }

   dropPlayerFromRoster = async () => {
      await __DropPlayerFromRoster( this.state.roster_id, this.state.selectedPlayer )

      await this.refreshRoster()
   }

   render() {
      return (
         <div>
            <h2>Drop Players</h2>
            <div>
            <label htmlFor="selTeam">Select a Team </label>
            <select id="selTeam" onChange={this.handleSelectTeam}>
               {this.state.teams.map((e) => (
                  <option value={e.team._id} key={e.team_id}>
                     {e.team.name}
                  </option>
               ))}
            </select>
            </div>
            <div>
            <label htmlFor="selTeam">Select a Player</label>
            <select id="selTeam" onChange={this.handleSelectPlayer}>
               {this.state.roster.map((e) => (
                  <option value={e._id} key={e._id}>
                     {e.name} {`(${e.position}/${e.nflTeam})`}
                  </option>
               ))}
            </select>
            </div>
            <button onClick={this.dropPlayerFromRoster}>
               Drop Selected Player from Roster
            </button>
         </div>
      )
   }
}
