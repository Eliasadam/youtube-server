const mongoose = require('mongoose')

const youtubeVideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('youtubeVideo', youtubeVideSchema)