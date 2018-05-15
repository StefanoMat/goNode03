const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [{
    type: String,
    trim: true,
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Post', PostSchema);
