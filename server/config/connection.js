const mongoose = require('mongoose');

// connects to local host if not deployed on heroku
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/board-game-tracker',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;