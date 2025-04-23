const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'urls', required: true },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
});

module.exports = mongoose.model('clicks', clickSchema);