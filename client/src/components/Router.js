import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Layout from './Layout'
import Standings from '../pages/Standings'
import Rules from '../pages/Rules'
import Admin from '../pages/Admin'
import Rosters from '../pages/Rosters'

class Router extends Component {
   constructor() {
      super()
      this.state = {}
   }

   componentDidMount() {}

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
               /><Route
               path="/rosters"
               component={() => (
                  <Layout>
                     <Rosters />
                  </Layout>
               )}
            />
            </Switch>
         </main>
      )
   }
}

export default withRouter(Router)
