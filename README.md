# G-League-FFL

## November 9, 2020

### By: Aaron Walker
[linkedIn](www.linkedin//in/walker-aaron)
***
### Overview

The G-League is a Fantasy Football League running in a Guillotine style - one team is eliminated after each two-week round - with a best-ball lineup system.  The rosters grow each week and the lineups in use grow each round.   The purpose of this application is to manage the rosters of all the teams in the league and score games and produce and display results.  The application will use the external [FantasyData](fantasydata.com) API as a source for scoring data and detailed player information.

***
### Technologies Used
* React
* Express
* Node
* HTML/CSS
* Javascript
* Mongoose
* MongoDB
***
Initial Entity Relationship Diagram
![ERD](G-LeagueERD.png)

Initial Component Heirarchy Diagram
![CHD](G-LeagueCHD.png)


### User Stories - MVP
The user must be able to...
- [x] view the results for each week
- [x] review the rules and scoring system
- [x] view the current rosters for all teams
- [x] view an individual player's weekly results
- [x] add players to a team's roster.
- [x] drop players from a team's roster.
- [x] alter the lineup definition as the rounds progress
- [x] remove teams from competition as they are eliminated each round
- [x] advance the week and round as appropriate
- [x] make a copy of rosters when the week advances
- [x] load the most recent results/statistics and score the week
- [x] see headshots and vital stats about players (height/weight/etc)
***
### Future Updates / Backlog
- [x] support authorization 
- [x] restrict access to certain functions (loading scores, advancing week, etc) to the designated admin
- [] post comments about the results of each week

***
Project Tracking
Stories, backlog, and WIP managed at [Trello](https://trello.com/b/kJpCpP6C/g-league)


