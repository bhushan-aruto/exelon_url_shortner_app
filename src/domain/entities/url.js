const mongoose = require("mongoose");

const urlSechema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    targetUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date
    },
    clickCount: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model("urls", urlSechema);