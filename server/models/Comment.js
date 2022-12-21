const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema for comments on games
const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String, 
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            get: timestamp => dateFormat(timestamp)
        }
    }, 
);

module.exports = commentSchema;