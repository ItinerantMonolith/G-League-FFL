const { Team } = require('../db/schema')
const bcrypt = require('bcrypt')

require('dotenv').config()
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const {
   checkPassword,
   generatePassword
 } = require('../middleware/passwordHandler')

const Login = async (req, resp, next) => {
   try {
      const team = await Team.findById( req.body.team )
      console.log(team)
      if (
        team &&
        (await checkPassword(req.body.password, team.password_digest))
      ) {
        const payload = {
          _id: team._id,
          name: team.name
        }
        resp.locals.payload = payload
        return next()
      }
      resp.status(401).send({ msg: 'Unauthorized' })
    } catch (err) {
      throw err
    }
}

const UpdatePassword = async (req, resp) => {
   try {
      const team = await Team.findById( req.body.team )
      if ( team && (await checkPassword(req.body.oldPassword, team.password_digest))) {
         await Team.updateOne( { _id: team._id }, { password_digest: await bcrypt.hash( req.body.newPassword, saltRounds )} )
         return resp.send("Password Updated")
      }
      resp.status(401).send({ msg: 'Unauthorized' })
   }
   catch (err) {
      throw err
   }

}

const RefreshSession = (req, resp) => {
   const token = resp.locals.token
   resp.send(token)
}

module.exports = {
   Login,
   UpdatePassword,
   RefreshSession
}
