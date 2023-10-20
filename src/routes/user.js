const express = require("express")
const router = express.Router()

const {getUser} = require("../controllers/user")
const { webHook, messagingWebHook } = require("../controllers/facebookMessangerBot")

router.route("/:id").get(getUser)

router.route("webhook").post(webHook)

router.route("messaging-webhook").post(messagingWebHook)

module.exports = router