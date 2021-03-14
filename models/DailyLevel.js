const mongoose = require('mongoose');

const dailyLevel = new mongoose.Schema({
    day: {
        type: Number,
        default: new Date().getDate()
    },
    month: {
        type: Number,
        default: new Date().getMonth() + 1
    },
    time: {
        type: Date,
        default: Date.now()
    },
    year: {
        type: Number,
        default: new Date().getFullYear()
    },
    glucoseLevel: {
        type: Number
    }
})

const DailyLevel = mongoose.model('DailyLevel', dailyLevel);
module.exports = DailyLevel;