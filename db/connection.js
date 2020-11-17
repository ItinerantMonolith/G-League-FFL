const mongoose = require('mongoose');

const connection = mongoose.connect( process.env.NODE_ENV === 'production' ? process.env.DB_URL : 'mongodb://localhost:27017/GLeague', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.set('debug', true);

module.exports = connection;

