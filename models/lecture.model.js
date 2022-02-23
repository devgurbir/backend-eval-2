const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title: {type: String, required: true},
    batch: {type: String, required: true},
    author_id : {type: String, required: true},
})

const Lecture = mongoose.model("Lecture", lectureSchema)

module.exports = Lecture
