const { Schema, model } = require('mongoose');

const TABLE_NAME = 'User';

const UserSchema = new Schema({
  username: String,
  password: String,
});

const User = model(TABLE_NAME, UserSchema);

module.exports = {
  User,
  UserSchema,
};
