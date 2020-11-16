import React, { Component } from 'react'
import { __UpdateFormation, __GetRound } from '../services/LeagueService'

export default class ChangeFormation extends Component {
   constructor() {
      super()
      this.state = {
         round: '',
         selectedPosition: '0',
      }
   }

   componentDidMount = async () => {
      // the current round/formation
      await this.getCurrentRound()
   }

   getCurrentRound = async () => {
      const res = await __GetRound(this.props.round)
      await this.setState({ round: res })

      // const maxPos = [2, 3, 3, 2, 2]
      // +== cap the positions correctly

   }

   handleSelectPos = async (e) => {
      await this.setState( {
         selectedPosition: e.target.value
      })
   }

   handleAddPosition = async () => {
      const res = await __UpdateFormation ( this.state.selectedPosition )

      await this.getCurrentRound()
      alert ("Formation Updated")
   }

   render() {
      const { round } = this.state
      const positions = ['QB', 'RB', 'WR', 'TE', 'Flex']

      let dispPos = ''
      if (round)
         dispPos = positions.map((e, i) => {
            return `${e}:${this.state.round.formation[i]} ${
               i < dispPos.length - 1 ? ' - ' : ''
            }`
         })
      return (
         <div>
            <h3>Change Formation</h3>
            The current formation is: {dispPos}
            <div>
               <label>Select a position to add</label>
               <select onClick={this.handleSelectPos}>
                  {positions.map((e, i) => (
                     <option value={i} key={i}>
                        {e}
                     </option>
                  ))}
               </select>
            </div>
            <button onClick={this.handleAddPosition}>Add Selected Position</button>
         </div>
      )
   }
}
