const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    postName: {
      type: String,
      unique: true,
      required: [true, 'Please provide postName'],
      maxlength: [100, 'Post name can not be more than 100 characters'],
    },
    postContent: {
      type: String,
      required: [true, 'Please provide post content']
    },
    userId: {
      type: Number,
      required: [true, 'Please provide userId to fetch userDetails'],
    }
  },
);

module.exports = mongoose.model('Posts', PostSchema);