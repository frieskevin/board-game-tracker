const { Schema } = require('mongoose');

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
            default: Date.now
        }
    }, 
);

module.exports = commentSchema;