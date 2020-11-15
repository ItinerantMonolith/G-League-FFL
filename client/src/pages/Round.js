import React, { Component } from 'react'
import { __GetRound } from '../services/LeagueService'
import '../styles/round.css'

export default class Round extends Component {
   constructor() {
      super()
   
      this.lastRound= 0
      this.state = {
         results: []
      }
   }

   componentDidMount = () => {
      // this.loadRound()
   }

   loadRound = async () => {
      console.log ( 'in loadRound', this.props.round)
      
      // now get the teams and scores for this week
      const round = await __GetRound( this.props.round )
      console.log ( 'Round.loadRound', round )

      await this.setState( { results: round.results } )
      this.lastRound = this.props.round
   }

   render() {
      console.log ( this.props )
      if ( this.lastRound !== this.props.round ) 
         this.loadRound()
      return (
         <div className='round'>
            <h3>{ this.props.prevRound ? <span onClick={this.props.prevRound} className='changeRound'> &lt;&lt; </span> : <span className='changeRound'> </span>}
               Round {this.props.round}
               { this.props.nextRound ? <span onClick={this.props.nextRound} className='changeRound'> &gt;&gt; </span> : <span className='changeRound'> </span>}</h3>
            { this.state.results.map( e => (<div className='round-team' key={e._id}><div>{e.team.name}</div><div>{e.score}</div></div>) ) }
         </div>
      )
   }
}
