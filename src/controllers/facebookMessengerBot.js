const webHook = (req, res) => {
  let body = req.body;
  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });
  if (body.object === "page") {
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

const messagingWebHook = (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === config.verifyToken) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};

module.exports = { webHook, messagingWebHook };
