import React from 'react'
import Nav from './Nav'
import '../styles/layout.css'
import imgGuillotine from '../assets/guillotine.png'
import imgFootball from '../assets/football.png'

const Layout = ({ children, authenticated, currentTeam }) => (
   <div>
      <header>
         <div className="headerBlock">
            <div>
               <img src={imgFootball} />
            </div>
            <div>
               <section className="landing">
                  <h1>Welcome to the G-League</h1>
                  <h4>
                     Guillotine style Fantasy Football for those who should know
                     better.
                  </h4>
               </section>
            </div>
            <div>
               <img src={imgGuillotine} />
            </div>
         </div>
         <Nav authenticated={authenticated} currentTeam={currentTeam} />
      </header>
      {children}
   </div>
)

export default Layout
