const { Schema} = require('mongoose')

module.exports = new Schema(
   {
      name: { 
         type: String,
         required: true
      },
      bye: {
         type: Number,
         required: true
      },
      abbreviation: {
         type: String,
         required: true
      },
      profile: {
         type: String,
         required: true
      }
   }
)

