const { Schema } = require('mongoose')

module.exports = new Schema(
   {
      currentRound: { type: Number, required: true },
      currentWeek: { type: Number, required: true }
   }
)
