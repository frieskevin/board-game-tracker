const { Schema, model } = require('mongoose');
const gameSchema = require('./Game');
const userSchema = require('./User');
const characterSchema = require('./Character');

const playedSchema = new Schema(
    {
       game: [gameSchema],
       players: [userSchema],
       characters:[characterSchema],
       winner: [userSchema],
       createdAt: {
           type: Date,
           default: Date.now,
       },
       gameLength: {
           type: Number,
           default: 0,
       },
       gameNotes: {
           type: String,
           default: '',
           maxLength: 400
       },
       score: {
        type: String
       }
    }
    );

    const GamesPlayed = model('GamesPlayed', playedSchema);
    module.exports = GamesPlayed;
