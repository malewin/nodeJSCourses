const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true },
    hasPaySubscribe: { type: Boolean, default: false },
    rateStatus: { type: String, enum: ['free', 'album', 'premium'], default: 'free' },
    songs: [{ type: String }], // массив имен загруженных песен
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);