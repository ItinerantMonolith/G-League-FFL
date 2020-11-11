const { Schema} = require('mongoose')
const { Stats } = require('./Stats')

module.exports = new Schema(
   {
      name: { 
         type: String,
         required: true
      },
      position: {
         type: String,
         required: true
      },
      team: {
         type: Schema.Types.ObjectId,
         ref: 'NFLTeam'
      },
      dataId: {
         type: Number,
         required: true
      },
      stats: [ Stats ]
   },
   { timestamps: true }
)