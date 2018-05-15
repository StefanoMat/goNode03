const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async create(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
      }

      if (user.friends.indexOf(req.userId) !== -1) {
        return res.status(400).json({
          erro: `You're already friends with ${user.name}`,
        });
      }

      user.friends.push(req.userId);
      await user.save();

      const me = await User.findById(req.userId);
      me.friends.push(req.params.id);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
      }

      const friends = user.friends.indexOf(req.userId);

      if (friends === -1) {
        return res.status(400).json({
          error: `You're not friends with ${user.name}`,
        });
      }

      user.friends.splice(friends, 1);
      await user.save();

      const me = await User.findById(req.userId);
      me.friends.splice(me.friends.indexOf(user.id), 1);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },
};
