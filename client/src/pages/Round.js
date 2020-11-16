import React, { Component } from 'react'
import { __GetRound } from '../services/LeagueService'
import { __GetRosterScores } from '../services/RosterService'
import '../styles/round.css'

export default class Round extends Component {
   constructor() {
      super()

      this.state = {
         results: [],
         lastRound: 0,
         round: '',
      }
   }

   componentDidMount = () => {
      // this.loadRound()
   }

   loadRound = async () => {
      //  get the teams and scores for this week
      const round = await __GetRound(this.props.round)

      const week1 = await __GetRosterScores(round.week1)
      // we should always have this, so now walk the results and put these in.
      const results = round.results

      results.forEach((e) => {
         e['week1'] = week1.find((roster) => e.team._id === roster.team).score
         e['week2'] = ''
      })

      const week2 = await __GetRosterScores(round.week2)

      if (week2.length > 0)
         results.forEach((e) => {
            e['week2'] = week2.find(
               (roster) => e.team._id === roster.team
            ).score
         })

      await this.setState({
         results: results,
         lastRound: round.round,
         round: round,
      })
   }

   render() {
      if (this.state.lastRound !== this.props.round) this.loadRound()
      return (
         <div className="round">
            <h3>
               {this.props.prevRound ? (
                  <span onClick={this.props.prevRound} className="changeRound">
                     &lt;&lt;
                  </span>
               ) : (
                  <span className="changeRound"> </span>
               )}
               Round {this.props.round}
               {this.props.nextRound ? (
                  <span onClick={this.props.nextRound} className="changeRound">
                     &gt;&gt;
                  </span>
               ) : (
                  <span className="changeRound"> </span>
               )}
            </h3>
            <div className="round-results">
               <div className="round-team round-header">
                  <div></div>
                  <div>Week {this.state.round.week1}</div>
                  <div>Week {this.state.round.week2}</div>
                  <div>Total</div>
               </div>

               {this.state.results.map((e) => (
                  <div className={ this.props.currentTeam === e.team._id ? "round-team myteam" : "round-team"} key={e.team._id}>
                     <div className="round-name">{e.team.name}</div>
                     <div>{e.week1}</div>
                     <div>{e.week2}</div>
                     <div>{e.score}</div>
                  </div>
               ))}
            </div>
         </div>
      )
   }
}
