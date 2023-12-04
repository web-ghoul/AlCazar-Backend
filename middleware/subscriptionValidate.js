const {
    subscriptionSchemaValidate,
} = require("../utils/subscriptionSchemaValidate");


const subscriptionValidate = async (req, res, next) => {
    try {
        await subscriptionSchemaValidate.validateAsync(req.body);
        next();
    } catch (err) {
        err.message = err.message
            .split("")
            .filter((char) => char !== '"' && char !== "/")
            .join("");
        res.status(405).json({ error: err.message });
    }
};

module.exports = { subscriptionValidate };
