const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: null
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post_id:{
        type: String
    },
    parent_id:{
        type: String,
        default: null
    },
    body:{
        type: String
    },
    replies:{
        type: [],
        default: null
    }
});

module.exports = mongoose.model('Comment', CommentSchema);