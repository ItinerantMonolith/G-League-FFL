const Router = require('express').Router()

const TeamController = require('../controllers/TeamController')

Router.post('/login', TeamController.Login)
Router.put('/password', TeamController.UpdatePassword)

module.exports = Router
