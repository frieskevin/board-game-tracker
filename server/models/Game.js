const { Schema, model } = require('mongoose');
const Characters = require('./Characters');

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
        image: {
            type: String
        },
        link: {
            type: String
        },
        characters: [Characters]
    },
);

const Game = model('Game', gameSchema);

module.exports = Game;