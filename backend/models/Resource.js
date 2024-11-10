// models/Resource.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    topic: { type: String, required: true, unique: true },
    content: { type: Object, required: true },
    totalTaskCount: { type: Number, default: 0 },       // Total count of tasks
    completedTaskCount: { type: Number, default: 0 },   // Count of completed tasks
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
