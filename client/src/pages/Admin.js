import React, { Component } from 'react'
import {
   __GetLeague,
   __GetRound,
   __ScoreWeek,
   __AdvanceWeek,
} from '../services/LeagueService'
import AddPlayer from './AddPlayer'
import DropPlayer from './DropPlayer'
import ChangeFormation from './ChangeFormation'

import '../styles/admin.css'

export default class Admin extends Component {
   constructor() {
      super()
      this.state = {
         currentRound: 0,
         currentWeek: 0,
         teams: [],
         mode: 0,
      }
   }

   componentDidMount = () => {
      // need to get the league and then the current round to see what teams are still around
      this.loadLeague()
   }

   loadLeague = async () => {
      const leagueInfo = await __GetLeague()

      // now get the teams and scores for this week
      const round = await __GetRound(leagueInfo.currentRound)
      const teams = []
      round.results.forEach((e) => teams.push(e.team))
      await this.setState({
         currentRound: leagueInfo.currentRound,
         currentWeek: leagueInfo.currentWeek,
         teams: teams,
      })
   }

   handleAdvanceWeek = async () => {
      if (window.confirm('Do you really want to advance the week?')) {
         const res = await __AdvanceWeek()
         alert('Complete')
         console.log(res)
      }
   }

   handleLoadStats = async () => {
      if (window.confirm('Do you really want to reload stats and rescore?')) {
         const res = await __ScoreWeek(this.state.currentWeek)
         alert(res)
      }
   }


   setAddPlayers = () => this.setState({ mode: 1 })

   setDropPlayers = () => this.setState({ mode: 2 })

   changeLineup = () => this.setState({ mode: 3 })

   render() {
      let content = ''
      switch (this.state.mode) {
         case 1:
            content = (
               <AddPlayer
                  week={this.state.currentWeek}
                  round={this.state.currentRound}
               />
            )
            break

         case 2:
            content = (
               <DropPlayer
                  week={this.state.currentWeek}
                  round={this.state.currentRound}
               />
            )
            break

         case 3:
            content = (
               <ChangeFormation
                  week={this.state.currentWeek}
                  round={this.state.currentRound}
               />
            )
            break

         default:
            break
      }
      return (
         <div>
            <h3>Admin Functions</h3>
            <div className="adminCenter">
               <div className="adminMenu">
                  <button onClick={this.handleLoadStats} className="adminBtn">Load Stats</button>
                  <button onClick={this.handleAdvanceWeek} className="adminBtn">Advance Week</button>
                  <button onClick={this.setAddPlayers} className="adminBtn">Add Players</button>
                  <button onClick={this.setDropPlayers} className="adminBtn">Drop Players</button>
                  <button onClick={this.changeLineup} className="adminBtn">Change Formation</button>
               </div>
               <div className="adminContent">{content}</div>
            </div>
         </div>
      )
   }
}
