const mongoose = require('mongoose')

const ideaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Idea', ideaSchema)