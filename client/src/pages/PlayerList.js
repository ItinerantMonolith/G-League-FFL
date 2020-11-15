import React, { Component } from 'react'
import { __GetRoster } from '../services/RosterService'

export default class PlayerList extends Component {
   constructor() {
      super()

      this.state = {
         lastWeek: 0,
         lastTeam: 0,
         players: [],
      }
   }

   loadRoster = async () => {
      const roster = await __GetRoster(this.props.team, this.props.week)
      // let roster = { players: [ { _id: 'asd;fkl', name:'fred', position: 'qb', nflTeam: 'fa'} ] }
      roster.players.sort((a, b) => {
         if (a.sortPos < b.sortPos) return -1
         else if (a.sortPos > b.sortPos) return 1
         else {
            if (a.name < b.name) return -1
            else return 1
         }
      })

      await this.setState({
         players: roster.players,
         lastWeek: this.props.week,
         lastTeam: this.props.team
      })
   }

   render() {
      if (
         this.props.week !== this.state.lastWeek ||
         this.props.team !== this.state.lastTeam
      )
         this.loadRoster()

      return (
         <div>
            {this.state.players.map((e) => (
               <div className="playerView" key={e._id}>
                  <div>{e.name}</div>
                  <div>
                     {e.position}/{e.nflTeam}
                  </div>
               </div>
            ))}
         </div>
      )
   }
}
