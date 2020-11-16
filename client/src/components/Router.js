import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Layout from './Layout'
import Standings from '../pages/Standings'
import Rules from '../pages/Rules'
import Admin from '../pages/Admin'
import Rosters from '../pages/Rosters'
import Login from '../pages/Login'
import ProtectedRoute from './ProtectedRoute'
import { __CheckSession } from '../services/TeamService'

class Router extends Component {
   constructor() {
      super()
      this.state = {
         authenticated: false,
         currentTeam: null,
       }
   }

   componentDidMount() {
      this.verifyTokenValid()
   }

   verifyTokenValid = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const session = await __CheckSession()
          this.setState(
            {
              currentTeam: session,
              authenticated: true
            },
            () => this.props.history.push('/')
          )
        } catch (error) {
          this.setState({ currentTeam: null, authenticated: false })
          localStorage.clear()
        }
      }
      console.log ( 'no token')
   }
   
   toggleAuthenticated = (value, team, done) => {
      console.log ('toggle:', value, team )
     this.setState({ authenticated: value, currentTeam: team }, () => done())
   }

   render() {
      return (
         <main>
            <Switch>
               <Route
                  exact
                  path="/"
                  component={() => (
                     <Layout>
                        <Standings />
                     </Layout>
                  )}
               />
               <Route
                  path="/rules"
                  component={() => (
                     <Layout>
                        <Rules />
                     </Layout>
                  )}
               />
               <Route
                  path="/admin"
                  component={() => (
                     <Layout>
                        <Admin />
                     </Layout>
                  )}
               />
               <Route
               path="/rosters"
               component={() => (
                  <Layout>
                     <Rosters />
                  </Layout>
               )}
               />
               <Route
               path="/login"
               component={(props) => (
                  <Layout>
                     <Login {...props} toggleAuthenticated={this.toggleAuthenticated}/>
                  </Layout>
               )}
               />
            </Switch>
         </main>
      )
   }
}

export default withRouter(Router)
