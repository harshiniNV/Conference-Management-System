//@NVR HARSHINI
const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'conferencecategories'
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Conference', conferenceSchema);