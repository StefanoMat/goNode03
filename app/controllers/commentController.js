const mongoose = require('mongoose');

const User = mongoose.model('User');
const Post = mongoose.model('Post');

module.exports = {
  async create(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ error: 'Post never did exist or was delete' });
      }

      if (user.friends.indexOf(post.user) === -1) {
        return res.status(400).json({
          erro: `You aren't friends with ${user.name}, so can't comment this post`,
        });
      }
      post.comments.push(req.body.content);
      await post.save();

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },

};
