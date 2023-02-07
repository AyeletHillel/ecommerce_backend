const express = require("express")
const bcrypt = require("bcryptjs")
require("jsonwebtoken")

require("./server")
const User = server.User

// create the router
const router = express.Router

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

})

// logout post
router.post("/signup", async (req, res) => {

})