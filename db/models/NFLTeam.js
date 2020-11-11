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
      abbr: {
         type: String,
         required: true
      },
      Logo: {
         type: String,
         required: true
      }
   }