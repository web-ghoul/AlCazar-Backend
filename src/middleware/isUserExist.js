const User = require("../models/user")
const isUserExist = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        if (user) {
            next()
        } else {
            res.status(404).json({ error: "User is not Exist" });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
module.exports = { isUserExist }