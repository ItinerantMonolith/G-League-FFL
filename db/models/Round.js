const { Schema } = require('mongoose')

module.exports = new Schema(
   {
      QB: { type: Number, required: true },
      RB: { type: Number, required: true },
      WR: { type: Number, required: true },
      TE: { type: Number, required: true },
      FX: { type: Number, required: true },
      round: { type: Number, required: true },
      week1: { type: Number, required: true },
      week2: { type: Number, required: true },
      comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
      results: [ { team: { type: Schema.Types.ObjectId, ref: 'teams' },
                  score: { type: Number, required: true } }
               ]
   },
   { timestamps: true }
)