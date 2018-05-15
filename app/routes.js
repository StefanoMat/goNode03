const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.post('/signin', controllers.authController.signin);
routes.post('/signup', controllers.authController.signup);
/**
 * Auth routes
 */
routes.use(authMiddleware);
module.exports = routes;

/**
 * Feed
 */
routes.get('/feed', controllers.userController.feed);
/**
 * Comments
 */
routes.post('/comment/:id', controllers.commentController.create);

/**
 * Friends request
 */
routes.post('/friend/:id', controllers.friendController.create);
routes.delete('/unfriend/:id', controllers.friendController.destroy);

/**
 * Posts
 */
routes.post('/post', controllers.postController.create);
routes.delete('/post/:id', controllers.postController.destroy);
/**
 *  Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);

