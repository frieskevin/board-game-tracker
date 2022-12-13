const { Schema, model } = require('mongoose');

const characterSchema = new Schema(
    {
        playedGame: {
            type: Schema.Types.ObjectId,
            ref: 'gamesPlayed'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        character: {
            type: String
        }
}
);

const Characters = model('Characters', characterSchema);

module.exports = Characters;