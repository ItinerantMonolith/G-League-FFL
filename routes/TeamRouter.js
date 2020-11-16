const Router = require('express').Router()
const { createToken, verifyToken, getToken } = require('../middleware/jwtHandler')
const TeamController = require('../controllers/TeamController')

Router.post('/login', TeamController.Login, createToken)
Router.post('/password', getToken, verifyToken, TeamController.UpdatePassword)
Router.get('/refresh/session', getToken, verifyToken, TeamController.RefreshSession)

module.exports = Router


