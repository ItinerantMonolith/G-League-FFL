import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'

class Router extends Component {
   constructor() {
      super()
      this.state = {
      }
   }

   componentDidMount() {
   }

   render() {
      return (
         <main>
            <Switch>
               <Route
                  exact path='/'
                  component={ () => (
                     <Layout>
                        <Home />
                     </Layout>
                  )}
               />
            </Switch>
         </main>
      )
   }
}

export default withRouter(Router)
