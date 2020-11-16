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
         selectedTeam: '',
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
      this.setState({ selectedTeam: e.target.value })
   }

   handlePassword = (e) => {
      this.setState({ password: e.target.value })
   }

   handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const loginData = await __LoginTeam({
            selectedTeam: this.state.selectedTeam,
            password: this.state.password,
         })
         localStorage.setItem('token', loginData.token)
         this.props.toggleAuthenticated(true, loginData.user, () =>
            this.props.history.push('/')
         )
      } catch (error) {
         console.log('error logging in:', error)
         this.setState({ formError: true })
      }
   }

   render() {
      const { password } = this.state
      return (
         <div>
            <form className="" onSubmit={this.handleSubmit}>
               <div className="loginArea">
                  <div>
                     <label htmlFor="selTeam">Who are you?</label>
                     <select
                        id="selTeam"
                        onChange={this.handleSelectTeam}
                        value={this.state.selectedTeam}
                     >
                        <option value="" key="0"></option>
                        {this.state.teams.map((e) => (
                           <option value={e.team._id} key={e.team_id}>
                              {e.team.name}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div>
                     <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handlePassword}
                        placeholder="Password"
                        autoComplete="false"
                     />
                  </div>
                  <div>
                     <button>Sign In</button>
                  </div>
                  {this.state.formError ? (
                     <p>Error While Logging In</p>
                  ) : (
                     <p></p>
                  )}
               </div>
            </form>
         </div>
      )
   }
}
