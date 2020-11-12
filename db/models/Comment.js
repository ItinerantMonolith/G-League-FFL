const { Schema } = require('mongoose')

module.exports = new Schema(
   {
      team: { type: Schema.Types.ObjectId, ref: 'teams' },
      comment: { type: String, required: true },
   },
   { timestamps: true }
)
