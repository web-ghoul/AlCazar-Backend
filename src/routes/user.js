const express = require("express")
const router = express.Router()

const { getUser, deleteAccount } = require("../controllers/user")
const { authorization } = require("../middleware/authorized")

router.route("/:id").get(authorization, getUser)

router.route("/deleteAccount").delete(authorization, deleteAccount)

module.exports = router