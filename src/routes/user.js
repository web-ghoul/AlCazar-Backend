const express = require("express")
const router = express.Router()

const {getUser} = require("../controllers/user")
const { authorization } = require("../middleware/authorized")

router.route("/:id").get(authorization ,getUser)

module.exports = router