const { Schema, model } = require('mongoose');

const TABLE_NAME = 'User';

const UserSchema = new Schema({
  username: String,
  password: String,
  redditRefreshToken: String,
  redditAccessToken: String,
  redditId: String,
});

const User = model(TABLE_NAME, UserSchema);

module.exports = User;
