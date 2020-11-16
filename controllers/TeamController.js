const { Team } = require('../db/schema')
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
    } catch (error) {
      throw error
    }
}

const UpdatePassword = async (req, resp) => {}

const RefreshSession = async ( req, resp) => {}

module.exports = {
   Login,
   UpdatePassword,
   RefreshSession
}
