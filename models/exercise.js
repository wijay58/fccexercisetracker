const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExerciseSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
}, { versionKey: false })

module.exports = mongoose.model('exercise', ExerciseSchema);