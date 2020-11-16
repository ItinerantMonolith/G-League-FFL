import React from 'react'
import Nav from './Nav'
import '../styles/layout.css'

const Layout = ({ children, authenticated, currentTeam }) => (
   <div>
      <header>
         <div>
            <section className="landing">
               <h1>Welcome to the G-League</h1>
               <h4>
                  Guillotine style Fantasy Football for those who should know
                  better.
               </h4>
            </section>
         </div>
         <Nav 
            authenticated={authenticated}
            currentTeam={currentTeam}/>
      </header>
      {children}
   </div>
)

export default Layout
