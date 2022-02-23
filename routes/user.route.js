const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload')
const {registerUser, login} = require("../controllers/user.controller")

router.post("/", upload.single("profile_photo_url"), registerUser)

router.post('/login', login)

module.exports = router