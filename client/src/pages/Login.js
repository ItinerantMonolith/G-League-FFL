import React, { Component } from 'react'
import { __LoginTeam } from '../services/TeamService'
import { __GetTeams } from '../services/RosterService'

export default class Login extends Component {
   constructor() {
      super()
      this.state = {
         password: '',
         formError: false,
         teams: [],
         selectedTeam: ''
      }
   }

   componentDidMount = () => {
      this.loadTeams()
   }

   loadTeams = async () => {
      const teams = await __GetTeams(0)
      teams.sort((a, b) => (a.team.name < b.team.name ? -1 : 1))
      await this.setState({
         teams: teams,
      })
   }

   handleSelectTeam = (e) => {
      this.setState ( { selectedTeam: e.target.value })
   }

   handlePassword = (e) => {
      this.setState({ password: e.target.value })
   }

   handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const loginData = await __LoginTeam(this.state)
         // console.log(loginData)
         this.props.toggleAuthenticated(true, loginData.user, () =>
            this.props.history.push('/profile')
         )
      } catch (error) {
         this.setState({ formError: true })
      }
   }
   render() {
      const { password } = this.state
      return (
         <div className="">
            <form className="" onSubmit={this.handleSubmit}>
               <div>
               <label htmlFor="selTeam">Select a Team </label>
               <select id="selTeam" onChange={this.handleSelectTeam} value={this.state.selectedTeam}>
                  <option value="" key="0"></option>
                  {this.state.teams.map((e) => (
                     <option value={e.team._id} key={e.team_id}>
                        {e.team.name}
                     </option>
                  ))}
               </select>
               </div>

               <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handlePassword}
                  placeholder="Password"
                  autoComplete="false"
               />
               <button>Sign In</button>
               {this.state.formError ? <p>Error While Logging In</p> : <p></p>}
            </form>
         </div>
      )
   }
}
