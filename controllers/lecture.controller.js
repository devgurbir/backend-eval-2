const Lecture = require("../models/lecture.model")

const getLectures = async (req, res) => {
    try {
        const lectures = await Lecture.find({});

        if(!lectures){
            return res.status(404).send({msg: "No lectures found"})
        }
        return res.status(200).send({msg: "Success", lectures})
        
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong"})
    }
}

const getOneLecture = async (req, res) => {
    console.log(req.params.lecture_id)
    try {
        const lecture = await Lecture.findById(req.params.lecture_id);
        if(!lecture){
            return res.status(400).send({msg: "Failed to get lecture"})
        }
        res.status(200).send({msg: "Success", lecture})
    } catch (error) {
        res.status(500).send({msg: "something went wrong"})
    }
}

const createLecture = async (req, res) => {
    if(!req.user.roles.includes('admin') || !req.user.roles.includes('instructor') ){
        res.status(500).send({msg: "Only an admin/instructor can create a lecture"})
    }
    
    try {
        const lecture = await Lecture.create({
            title: req.body.title,
            batch: req.body.batch,
            author_id: req.user._id
        })
    
        return res.status(201).send({msg: "Lecture created", lecture})
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong"})
    }
}

const patchLecture = async (req, res) => {   
    try {
        const lectureCheckForAuthor = await Lecture.findById(req.params.lecture_id);
        
        if(lectureCheckForAuthor.author_id != req.user._id && !req.user.roles.includes('admin') ){
            return res.status(400).send({msg: "Only authorized personnel can patch this lecture"})
        }

        const lecture = await Lecture.findOneAndUpdate({_id: req.params.lecture_id}, {...req.body}, {new: true})
        return res.status(201).send({msg: "Lecture patched", lecture})       
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong"})
    }
}

const deleteLecture = async (req, res) => {
    console.log('deleting lecture')
    try {
        const lectureCheckForAuthor = await Lecture.findById(req.params.lecture_id);
        
        if(lectureCheckForAuthor.author_id != req.user._id && !req.user.roles.includes('admin') ){
            return res.status(400).send({msg: "Only authorized personnel can delete this lecture"})
        }

        const lecture = await Lecture.findOneAndDelete({_id: req.params.lecture_id})
        return res.status(201).send({msg: "Lecture deleted", lecture})       
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong"})
    }
}

module.exports = {getLectures,createLecture, patchLecture, deleteLecture, getOneLecture }