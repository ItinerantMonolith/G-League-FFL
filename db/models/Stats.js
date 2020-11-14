const { Schema } = require('mongoose')

module.exports = new Schema({
   rushYds: { type: Number, required: true, default: 0 },
   rushTD: { type: Number, required: true, default: 0 },
   recYds: { type: Number, required: true, default: 0 },
   recTD: { type: Number, required: true, default: 0 },
   passYds: { type: Number, required: true, default: 0 },
   passTD: { type: Number, required: true, default: 0 },
   fumbles: { type: Number, required: true, default: 0 },
   interceptions: { type: Number, required: true, default: 0 },
   week: { type: Number, required: true },
   points: { type: Number, required: true}
})
