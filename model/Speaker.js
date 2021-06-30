//@NVR HARSHINI
const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Speaker', speakerSchema);