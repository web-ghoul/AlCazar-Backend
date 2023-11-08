const {
    userSchemaValidate,
} = require("../utils/userSchemaValidate");


const userValidate = async (req, res, next) => {
    req.body.data = JSON.parse(req.body.data);
    try {
        await userSchemaValidate.validateAsync(req.body.data);
        next();
    } catch (err) {
        err.message = err.message
            .split("")
            .filter((char) => char !== '"' && char !== "/")
            .join("");
        res.status(405).json({ error: err.message });
    }
};

module.exports = { userValidate };
