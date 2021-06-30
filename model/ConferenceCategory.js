//@NVR HARSHINI
const mongoose = require('mongoose');

const conferenceCategorySchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('ConferenceCategory', conferenceCategorySchema);