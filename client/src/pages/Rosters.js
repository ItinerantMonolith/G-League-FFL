import React, { Component } from 'react'
import '../styles/roster.css'

export default class Rosters extends Component {
   constructor() {
      super()
      this.state = {
         viewWeek: 0,
         maxWeek: 10
      }
   }

   componentDidMount = () => {
   }

   changeWeek = (newWeek) => {
      this.setState({ viewWeek: newWeek})
   }

   render() {
      const { viewWeek, maxWeek } = this.state
      return (
         <div className="rosters">
            <h2>
            { viewWeek > 4 ? (
                  <span onClick={() => this.changeWeek(viewWeek-1)} className="changeWeek">
                     &lt;&lt;
                  </span>
               ) : (
                  <span className="changeWeek"> </span>
               )}
               View Rosters for Week {viewWeek}
               { viewWeek < maxWeek ? (
                  <span onClick={() => this.changeWeek(viewWeek+1)} className="changeWeek">
                     &gt;&gt;
                  </span>
               ) : (
                  <span className="changeWeek"> </span>
               )}
     
            </h2>

         </div>
      )
   }
}