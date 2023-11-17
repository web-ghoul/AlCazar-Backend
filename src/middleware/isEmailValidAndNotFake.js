const validator = require("validator")

const isEmailValidAndNotFake = (req, res, next) => {
    const { email } = req.body
    if (validator.isEmail(email)) {
        const domain = email.split('@')[1].toLowerCase();
        if (domain === 'gmail.com') {
            next()
        } else {
            res.status(401).json({ error: "Email's Domain Must be GMAIL" })
        }
    } else {
        res.status(401).json({ error: "Email isn't Valid" })
    }
}

module.exports = { isEmailValidAndNotFake }