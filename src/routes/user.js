const express = require("express")
const router = express.Router()

const {getUser} = require("../controllers/user")
const { webHook, messagingWebHook } = require("../controllers/facebookMessangerBot")

router.route("/:id").get(getUser)

router.route("/messengerBot/webhook").post(webHook)

router.route("/messengerBot/webhook").get(messagingWebHook)

module.exports = router
// curl -X GET "localhost:3000api/user/webhook?hub.verify_token=kinyki&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"