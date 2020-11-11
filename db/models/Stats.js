const { Schema} = require('mongoose')

module.exports = new Schema (
   {
      RushYds: { type: Number, required: true, default: 0 },
      RushTD: { type: Number, required: true, default: 0 },
      RecYds: { type: Number, required: true, default: 0 },
      RecTD: { type: Number, required: true, default: 0 },
      PassYds: { type: Number, required: true, default: 0 },
      PassTD: { type: Number, required: true, default: 0 },
      Fumbles: { type: Number, required: true, default: 0 },
      Interceptions: { type: Number, required: true, default: 0 },
   }
)
