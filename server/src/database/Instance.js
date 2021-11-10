const { Schema, model, Types } = require('mongoose');

const TABLE_NAME = 'Instance';

const InstanceSchema = new Schema({
  user: Types.ObjectId,
  service: String,
  widget: String,
  params: Object,
});

const Instance = model(TABLE_NAME, InstanceSchema);

module.exports = Instance;
