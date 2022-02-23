const mongoose = require('mongoose');
const User = require('../models/user.model');
const {generateToken} = require('../utils/token')
const registerUser = async (req, res) => {
    try {
        console.log(req.file)
        const roles = req.body.roles.split(", ")
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profile_photo_url: req.file.path
        })
              
        const finalUser = await User.findOneAndUpdate({email: req.body.email}, { $addToSet: {roles: {$each: roles }}}).select("-password -roles")

        const userToBeReturned = await User.findOne({email: req.body.email})
        
        const token = generateToken(finalUser)

        return res.status(201).send({msg: "success", user: userToBeReturned, token})
    } catch (error) {
        return res.status(500).send({msg: "failed", error})
    }

}

const login = async (req, res) => {
    let user;
    // check if email exists in db
    try {
        user = await User.findOne({email: req.body.email})
        console.log(user)
        if(!user){
            return res.status(400).send({msg: "Check your username/password"})
        }

    } catch (error) {
        return res.status(500).send({msg: "Something wen't wrong"})
    }
    // compare passwords using checkPasswords method on userSchema
    try {
        const isMatch = await user.checkPassword(req.body.password);
        if(!isMatch){
        return res.status(400).send({msg: "Check your username/password"})
    }
    } catch (error) {
        return res.status(500).send({msg: "Something wen't wrong"})
    }

    const token = generateToken(user);

    return res.status(200).send({msg: "Sign-in successful", user: user.email, token  })

}
module.exports = {registerUser, login}