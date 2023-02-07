const router = require("express").Router();
require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../server.js")

// signup post
router.post("/signup", async (req, res) => {
    try {
    // hash password
    req.bogy.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    
    // generate the user
    const user = await User.create(req.body)

    // response
    res.json({status: "User created"}) 

} catch (error) {
        //send error
        res.status(400).json(error);
      }
})

// login post
router.post("/login", async (req, res) => {
    try {
    const {username, password} = req.body
    // get the user
    const user = await User.find({username})

    if (user) {
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (passwordCheck) {
            const payload = { username }
            const token = await jwt.sign(payload, process.env.SECRET)
            res.cookie("token", token, { httpOnly: true }).json(payload);

        } else {
        res.status(400).json({error: "Passwords do not match"})
    }

    } else {
        res.status(400).json({error: "User does not exist"})

    }} catch (error) {
        //send error
        res.status(400).json(error);
      }

})

// logout post
router.post("/signup", async (req, res) => {
    res.clearCookie("token").json({ response: "You are logged out"})

})

// Export Router
module.exports = router;