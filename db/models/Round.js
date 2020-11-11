const { Schema } = require('mongoose')

module.exports = new Schema(
   {
      QB: { type: Number, required: true },
      RB: { type: Number, required: true },
      WR: { type: Number, required: true },
      TE: { type: Number, required: true },
      FX: { type: Number, required: true },
      Round: { type: Number, required: true },
      week1: { type: Number, required: true },
      week2: { type: Number, required: true },
      comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
   },
   { timestamps: true }
)