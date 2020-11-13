const Router = require('express').Router()

const CommentController = require('../controllers/CommentController')

Router.post('/:round_id', CommentController.CreateComment)
Router.delete('/:comment_id', CommentController.DeleteComment)

module.exports = Router
