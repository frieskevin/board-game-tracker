const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

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
            default: Date.now
        },
        image: {
            type: String
        },
        link: {
            type: String
        },
        characters: {
            type: String,
            maxLength: 400
        },
        comments: [commentSchema]
    },
);

const Game = model('Game', gameSchema);

module.exports = Game;