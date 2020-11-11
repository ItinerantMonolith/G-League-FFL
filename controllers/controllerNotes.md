* Player
   * GetPlayer - return an enire player's data.  This should include the player details from FD(?)
   * UpdateStats - is this always a push onto the stats array?  Do we need to add Week to the stats?  is this really an API call?
   * GetPlayers - return players for a team and position filter.
      
* NFLTeam 
   * getTeams - return all teams - needed for player selection.
       
* Round
   * GetRound - return one round. populated with comments(?)  or is that different

* Comment
   * CreateComment
   * deleteComment

* Roster
   * addPlayer
   * removePlayer
   * getRoster

* Team
   * login
   * updatePassword

* League [was admin]
   * LoadScores
   * AdvanceWeek
   * Status/home - return the current round and week.
