const { Schema } = require('mongoose')
// const { Stats } = require('./Stats')

const Stats = new Schema({
   rushYds: { type: Number, required: true, default: 0 },
   rushTD: { type: Number, required: true, default: 0 },
   recYds: { type: Number, required: true, default: 0 },
   recTD: { type: Number, required: true, default: 0 },
   passYds: { type: Number, required: true, default: 0 },
   passTD: { type: Number, required: true, default: 0 },
   fumbles: { type: Number, required: true, default: 0 },
   interceptions: { type: Number, required: true, default: 0 },
   week: { type: Number, required: true },
})

module.exports = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      position: {
         type: String,
         required: true,
      },
      sortPos: {
         type: String,
         required: true,
      },
      team: {
         type: Schema.Types.ObjectId,
         ref: 'NFLTeam',
      },
      nflData_ID: {
         type: Number,
         required: true,
      },
      stats: [Stats],
      height: { type: String, required: false },
      weight: { type: Number, required: false },
      experience: { type: Number, required: false },
      college: { type: String, required: false },
      photoURL: { type: String, required: false },
   },
   { timestamps: true }
)
