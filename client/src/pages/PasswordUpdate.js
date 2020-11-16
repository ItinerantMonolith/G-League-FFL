import React, { Component } from 'react'
import { __UpdatePassword } from '../services/TeamService'

export default class PasswordUpdate extends Component {
   constructor() {
      super()
      this.state = {
         newPassword: '',
         oldPassword: '',
         formError: false,
      }
   }

   componentDidMount = () => {}

   handlePassword = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   updatePassword = async (e) => {
      e.preventDefault()
      try {
         const res = await __UpdatePassword({
            team: this.props.currentTeam,
            newPassword: this.state.newPassword,
            oldPassword: this.state.oldPassword,
         })
         alert ("Password Updated")
         this.props.history.push('/')
      } catch (err) {
         console.log('Error changing password:', err)
         this.setState({ formError: true })
      }
   }

   render() {
      const { password } = this.state
      return (
         <div className="">
            <form className="" onSubmit={this.handleSubmit}>
               <div>
                  <div>
                     <label>Enter Old Password</label>
                     <input
                        type="password"
                        name="oldPassword"
                        value={password}
                        onChange={this.handlePassword}
                        placeholder="Old Password"
                        autoComplete="false"
                     />
                  </div>
               </div>
               <div>
                  <label>Enter New Passowrd</label>
                  <input
                     type="password"
                     name="newPassword"
                     value={password}
                     onChange={this.handlePassword}
                     placeholder="New Password"
                     autoComplete="false"
                  />
               </div>
               <div>
                  <button onClick={this.updatePassword}>Update Password</button>
               </div>
               {this.state.formError ? <p>Error Updating Password</p> : <p></p>}
            </form>
         </div>
      )
   }
}
