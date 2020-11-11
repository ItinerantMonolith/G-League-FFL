const { Schema } = require('mongoose')

module.exports = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password_digest: { type: string, required: true },
      isAdmin: { type: Boolean, require: true, default: false }
   }
)