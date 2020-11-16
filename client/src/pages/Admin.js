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
import Confirm from '../components/Confirm'

import '../styles/admin.css'

export default class Admin extends Component {
   constructor() {
      super()
      this.state = {
         currentRound: 0,
         currentWeek: 0,
         teams: [],
         mode: -1,
         status: '',
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
      const res = await __AdvanceWeek()
      this.setState( { mode: -1, status: `Week updated.  Round: ${res.currentRound} Week: ${res.currentWeek}`})
   }

   handleLoadStats = async () => {
      this.setState({ status: '*** Stats Loading ***', mode: -1 })
      const res = await __ScoreWeek(this.state.currentWeek)
      console.log(res)

      this.setState({ status: res })
   }

   setMode = (mode) => this.setState({ mode: mode })

   render() {
      let content = ''
      switch (this.state.mode) {
         case 0:
            content = (
               <Confirm
                  msg="Do you really want to load stats for the week and rescore all players and teams?"
                  onConfirm={this.handleLoadStats}
               />
            )
            break

         case 1:
            content = (
               <Confirm
                  msg="Do you really want to Advance the Week (and possibly the Round)?"
                  onConfirm={this.handleAdvanceWeek}
               />
            )
            break

         case 2:
            content = (
               <AddPlayer
                  week={this.state.currentWeek}
                  round={this.state.currentRound}
               />
            )
            break

         case 3:
            content = (
               <DropPlayer
                  week={this.state.currentWeek}
                  round={this.state.currentRound}
               />
            )
            break

         case 4:
            content = (
               <ChangeFormation
                  week={this.state.currentWeek}
                  round={this.state.currentRound}
               />
            )
            break

         default:
            content = this.state.status
            break
      }
      return (
         <div>
            <h3>Admin Functions</h3>
            <div className="adminCenter">
               <div className="adminMenu">
                  <button onClick={() => this.setMode(0)} className="adminBtn">
                     Load Stats
                  </button>
                  <button onClick={() => this.setMode(1)} className="adminBtn">
                     Advance Week
                  </button>
                  <button onClick={() => this.setMode(2)} className="adminBtn">
                     Add Players
                  </button>
                  <button onClick={() => this.setMode(3)} className="adminBtn">
                     Drop Players
                  </button>
                  <button onClick={() => this.setMode(4)} className="adminBtn">
                     Change Formation
                  </button>
               </div>
               <div className="adminContent">{content}</div>
            </div>
         </div>
      )
   }
}
