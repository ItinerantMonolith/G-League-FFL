import React, { Component } from 'react'
import { __GetLeague } from '../services/LeagueService'

export default class Home extends Component {
   constructor() {
      super()
      this.state = {}
   }

   componentDidMount = () => {
      // need to get the league and then the current round for display
      this.loadLeague()      
      

   }

   loadLeague = async () => {
      const leagueInfo = await __GetLeague()
      console.log ( leagueInfo )
   }

   render() {
      return (
         <div>
            <h2>HOME</h2>
         </div>
      )
   }
}
