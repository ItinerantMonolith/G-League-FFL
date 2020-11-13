import React from 'react'
import Nav from './Nav'
import '../styles/layout.css'

export default ({ children, authenticated, currentUser }) => (
  <div >
     <section className='landing'>
        <h1> Welcome to the G-League</h1>
        <h3> Guillotine style Fantasy Football for those who aught to know better.</h3>
     </section>
    <Nav/>
    {children}
  </div>
)
