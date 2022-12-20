const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const gameSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        winner: {
            type: String
        },
        score: {
            type: String,
        },
        gameNotes: {
            type: String,
            default: '',
            maxLength: 400
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        image: {
            type: String
        },
        link: {
            type: String
        },
        players: {
            type: String,
            maxLength: 400
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
          getters: true
        }
      }
);

gameSchema.virtual('commentCount').get(function(){
    return this.comments.length;
});
const Game = model('Game', gameSchema);

module.exports = Game;