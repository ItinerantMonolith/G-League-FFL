import React from 'react'

const Rules = () => {
   return (
      <div>
         <h2>G-League Rules</h2>
         <p>
            There will be 7 rounds and each round will consist of two weeks
            (*when only 3 teams remain, they can vote on having two rounds or
            just on round lasting 3 weeks, so we might only have 6 rounds).
            Results will be totalled each week based on each team's best
            possible lineup.
         </p>
         <p>
            The team with the lowest total points for a Round will be
            eliminated, and all their players will enter the general available
            pool. Ties will be broken by adding additional flex players one at a
            time to the tied teams' scores for the round until they are no
            longer tied.
         </p>
         <p>
            The starting roster will have 14 players and every week there will
            be a one round draft, the first draft of each Round will be
            best-to-worst order, the second will be worst-to-best order.
            Additionally, after the second draft of a Round, each team may drop
            one player and draft a replacement, in best-to-worst order.
         </p>
         <p>
            At the beginning of each Round, remaining teams can vote on a new
            position to add to the lineups going forward.
         </p>
      </div>
   )
}

export default Rules
