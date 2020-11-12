const { Schema } = require('mongoose')

module.exports = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password_digest: { type: String, required: true },
      isAdmin: { type: Boolean, required: true, default: false }
   }
)