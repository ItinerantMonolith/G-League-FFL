import React, { Component } from 'react'
import { __GetLeague, __GetRound } from '../services/LeagueService'
import Round from './Round'

export default class Home extends Component {
   constructor() {
      super()
      this.state = {
         currentRound: 0,
         currentWeek: 0,
         results: []
      }
   }

   componentDidMount = () => {
      // need to get the league and then the current round for display
      this.loadLeague()      
   }

   loadLeague = async () => {
      const leagueInfo = await __GetLeague()
      console.log ( leagueInfo )
      
      // now get the teams and scores for this week
      const round = await __GetRound( leagueInfo.currentRound )
      console.log ( round )

      await this.setState( { 
         currentRound: leagueInfo.currentRound,
         currentWeek: leagueInfo.currentWeek,
         results: round.results
      })
   }

   render() {
      const rounds = []
      for (let i=1; i <= this.state.currentRound; i++ ) 
         rounds.push( <Round round={i} /> )
      return (
         <div>
            <h2>League Standings</h2>
            { rounds }
         </div>
      )
   }
}
