const { Schema } = require('mongoose');

const characterSchema = new Schema(
    {
        character: {
            type: [String],
            required: true
        }
    }
);

module.exports = characterSchema;