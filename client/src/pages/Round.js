import React, { Component } from 'react'
import { __GetRound } from '../services/LeagueService'
import '../styles/round.css'

export default class Round extends Component {
   constructor() {
      super()
      this.state = {
         results: []
      }
   }

   componentDidMount = () => {
      this.loadRound()
   }

   loadRound = async () => {
      // now get the teams and scores for this week
      const round = await __GetRound( this.props.round )
      console.log ( round )

      await this.setState( { results: round.results } )
   }

   render() {
      return (
         <div className='round'>
            <h3> Round {this.props.round}</h3>
            { this.state.results.map( e => (<div className='round-team'><div>{e.team.name}</div><div>{e.score}</div></div>) ) }
         </div>
      )
   }
}
