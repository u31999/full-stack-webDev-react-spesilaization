const monggose = require('mongoose');
const Schema = monggose.Schema;

let leaderSchema = new Schema({
    name:{
        type: String,
        required: true,
        min: 1
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        default: false
    }
})

let Leader = monggose.model('leader', leaderSchema);

module.exports = Leader;