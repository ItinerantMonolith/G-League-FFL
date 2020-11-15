import React, { Component } from 'react'
import { __GetLeague, __GetRound } from '../services/LeagueService'

import Round from './Round'

export default class Standings extends Component {
   constructor() {
      super()
      this.state = {
         currentRound: 0,
         currentWeek: 0,
         results: [],
         viewRound: 0
      }
   }

   componentDidMount = () => {
      // need to get the league and then the current round for display
      this.loadLeague()      
   }

   loadLeague = async () => {
      const leagueInfo = await __GetLeague()
      
      // now get the teams and scores for this week
      const round = await __GetRound( leagueInfo.currentRound )

      await this.setState( { 
         currentRound: leagueInfo.currentRound,
         currentWeek: leagueInfo.currentWeek,
         results: round.results,
         viewRound: leagueInfo.currentRound
      })
   }

   prevRound = async (  ) => {
      const newRound = this.state.viewRound - 1
      this.setState( { viewRound: newRound } )
   }

   nextRound = async (  ) => {
      const newRound = this.state.viewRound + 1
      this.setState( { viewRound: newRound } )
   }


   render() {
      const { viewRound, currentRound } = this.state
      const rounds = []
      for (let i=1; i <= currentRound; i++ ) 
         rounds.push( <Round round={i} /> )
      return (
         <div className="standings">
            <h2>League Standings</h2>
            <Round round={viewRound} 
               prevRound={ viewRound > 1 ? () => this.prevRound() : null }
               nextRound={ viewRound < currentRound ? () => this.nextRound() : null }
            />
         </div>
      )
   }
}
