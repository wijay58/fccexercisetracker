const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, { versionKey: false })

module.exports = mongoose.model('user', UserSchema);