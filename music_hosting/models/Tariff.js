const mongoose = require('mongoose');

const tariffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    limitAmountSongs: { type: Number, required: true },
});

module.exports = mongoose.model('Tariff', tariffSchema);