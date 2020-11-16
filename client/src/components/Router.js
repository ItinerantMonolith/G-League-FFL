import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Layout from './Layout'
import ProtectedRoute from './ProtectedRoute'
import Standings from '../pages/Standings'
import Rules from '../pages/Rules'
import Admin from '../pages/Admin'
import Rosters from '../pages/Rosters'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import PasswordUpdate from '../pages/PasswordUpdate'
import { __CheckSession } from '../services/TeamService'

class Router extends Component {
   constructor() {
      super()
      this.state = {
         authenticated: false,
         currentTeam: null,
         pageLoading: true,
      }
   }

   componentDidMount() {
      this.verifyTokenValid()
      this.setState({ pageLoading: false })
   }

   verifyTokenValid = async () => {
      const token = localStorage.getItem('token')
      if (token) {
         try {
            const session = await __CheckSession()
            this.setState(
               {
                  currentTeam: session,
                  authenticated: true,
               },
               () => this.props.history.push('/')
            )
         } catch (error) {
            this.setState({ currentTeam: null, authenticated: false })
            localStorage.clear()
         }
      } else console.log('no token')
   }

   toggleAuthenticated = (value, team, done) => {
      this.setState({ authenticated: value, currentTeam: team }, () => done())
   }

   logMeOut = () => {
      this.setState({ currentTeam: null, authenticated: false })
      localStorage.clear()
      this.props.history.push('/')
   }

   render() {
      return (
         <main>
            {this.state.pageLoading ? (
               <div>
                  <h3>Page is loading...</h3>
               </div>
            ) : (
               <Switch>
                  <Route
                     exact
                     path="/"
                     component={() => (
                        <Layout
                           authenticated={this.state.authenticated}
                           currentTeam={this.state.currentTeam}
                        >
                           <Standings
                              currentTeam={
                                 this.state.currentTeam
                                    ? this.state.currentTeam.team
                                    : null
                              }
                           />
                        </Layout>
                     )}
                  />
                  <Route
                     path="/rules"
                     component={() => (
                        <Layout
                           authenticated={this.state.authenticated}
                           currentTeam={this.state.currentTeam}
                        >
                           <Rules />
                        </Layout>
                     )}
                  />
                  <ProtectedRoute
                     authenticated={
                        this.state.currentTeam
                           ? this.state.currentTeam.asA
                           : false
                     }
                     path="/admin"
                     component={() => (
                        <Layout
                           authenticated={this.state.authenticated}
                           currentTeam={this.state.currentTeam}
                        >
                           <Admin />
                        </Layout>
                     )}
                  />
                  <Route
                     path="/rosters"
                     component={() => (
                        <Layout
                           authenticated={this.state.authenticated}
                           currentTeam={this.state.currentTeam}
                        >
                           <Rosters
                              currentTeam={
                                 this.state.currentTeam
                                    ? this.state.currentTeam.team
                                    : null
                              }
                           />
                        </Layout>
                     )}
                  />
                  <Route
                     path="/login"
                     component={(props) => (
                        <Layout
                           authenticated={this.state.authenticated}
                           currentTeam={this.state.currentTeam}
                        >
                           <Login
                              {...props}
                              toggleAuthenticated={this.toggleAuthenticated}
                           />
                        </Layout>
                     )}
                  />
                  <Route
                     path="/password"
                     component={(props) => (
                        <Layout
                           authenticated={this.state.authenticated}
                           currentTeam={this.state.currentTeam}
                        >
                           <PasswordUpdate
                              {...props}
                              currentTeam={
                                 this.state.currentTeam
                                    ? this.state.currentTeam.team
                                    : null
                              }
                           />
                        </Layout>
                     )}
                  />
                  <Route
                     path="/logout"
                     component={(props) => (
                        <Layout
                           authenticated={this.state.authenticated}
                           currentTeam={this.state.currentTeam}
                        >
                           <Logout logMeOut={this.logMeOut} />
                        </Layout>
                     )}
                  />
               </Switch>
            )}
         </main>
      )
   }
}

export default withRouter(Router)
