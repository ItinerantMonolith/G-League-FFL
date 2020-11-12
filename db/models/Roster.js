const { Schema } = require('mongoose')

module.exports = new Schema ( 
   {
      team: { type: Schema.Types.ObjectId, ref: 'teams' },
      week: { type: Number, required: true},
      score: { type: Number, required: true, default: 0 },
      players: [
         { type: Schema.Types.ObjectId, ref: 'players' }
      ],
      actions: [
         {
            action: { type: String, required: true },
            player: { type: Schema.Types.ObjectId, ref: 'players' }
         }
      ]
   },
   { timestamps: true }
)