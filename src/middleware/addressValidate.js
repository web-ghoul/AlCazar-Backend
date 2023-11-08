const {
    addressSchemaValidate,
} = require("../utils/addressSchemaValidate");


const addressValidate = async (req, res, next) => {
    try {
        await addressSchemaValidate.validateAsync(req.body);
        next();
    } catch (err) {
        err.message = err.message
            .split("")
            .filter((char) => char !== '"' && char !== "/")
            .join("");
        res.status(405).json({ error: err.message });
    }
};

module.exports = { addressValidate };
