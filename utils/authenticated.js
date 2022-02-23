const User = require("../models/user.model");
const { verifyToken } = require("./token");

const authenticated = async (req, res, next) => {
    let token;
    try {
        token = req.headers.authorization?.split("Bearer ")[1];
        if(!token){
            return res.status(500).send({msg: "Invalid token / token not present"})
        }
    } catch (error) {
        return res.status(500).send({msg: "Something went wrong"})
    }

    const payload = await verifyToken(token);

    if(!payload){
        return res.status(500).send({msg: "Invalid token / token not present"})
    }
    const user = await User.findById(payload.id).select("-password");

    if(!user){
        return res.status(500).send({msg: "This token isn't linked to a verified user"})
    }

    req.user = user

    next()
}

module.exports = authenticated