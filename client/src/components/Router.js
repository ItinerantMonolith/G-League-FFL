import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'
import Rules from '../pages/Rules'
import Admin from '../pages/Admin'

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
                        <Home />
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
            </Switch>
         </main>
      )
   }
}

export default withRouter(Router)
