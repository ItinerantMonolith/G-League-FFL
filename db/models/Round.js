const { Schema } = require('mongoose')

module.exports = new Schema(
   {
      round: { type: Number, required: true },
      week1: { type: Number, required: true },
      week2: { type: Number, required: true },
      formation: [ { type:Number } ],
      comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
      results: [ { team: { type: Schema.Types.ObjectId, ref: 'teams' },
                  score: { type: Number, required: true } }
               ]
   },
   { timestamps: true }
)