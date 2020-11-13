import React, { Component } from 'react'
import { __GetLeague, __GetRound } from '../services/LeagueService'
import AddPlayer from './AddPlayer'
import DropPlayer from './DropPlayer'


export default class Admin extends Component {
   constructor() {
      super()
      this.state = {
         currentRound: 0,
         currentWeek: 0,
         teams: [],
         mode: 0
      }
   }

   componentDidMount = () => {
      // need to get the league and then the current round to see what teams are still around
      this.loadLeague()
   }

   loadLeague = async () => {
      const leagueInfo = await __GetLeague()
      console.log ( leagueInfo )
      
      // now get the teams and scores for this week
      const round = await __GetRound( leagueInfo.currentRound )
      console.log ( round )
      const teams = []
      round.results.forEach( e => teams.push(e.team) )
      await this.setState( { 
         currentRound: leagueInfo.currentRound,
         currentWeek: leagueInfo.currentWeek,
         teams: teams
      })
   }

   handleAdvanceWeek = () => {

   }

   handleLoadStats = () => {

   }

   handleAdvanceRound= () => {

   }

   setAddPlayers = () => this.setState( { mode: 1 } )
   setDropPlayers = () => this.setState( { mode: 2 })

   render() {
      return (
            <div>
               <h3>Admin Functions</h3>
               <button onClick={this.handleLoadStats}>Load Stats</button>
               <button onClick={this.handleAdvanceWeek}>Advance Week</button>
               <button onClick={this.handleAdvanceRound}>Advance Round</button>
               <button onClick={this.setAddPlayers}>Add Players</button>
               <button onClick={this.setDropPlayers}>Drop Players</button>
               { this.state.mode === 0 ? '' : 
                  this.state.mode === 1 ? (
                     <AddPlayer week={this.state.currentWeek} />
                  ) : (
                     <DropPlayer week={this.state.currentWeek} />
                  )
               }        
            </div>

      )
   }
}
