const {
    orderSchemaValidate,
} = require("../utils/orderSchemaValidate");


const orderValidate = async (req, res, next) => {
    try {
        await orderSchemaValidate.validateAsync(req.body);
        next();
    } catch (err) {
        err.message = err.message
            .split("")
            .filter((char) => char !== '"' && char !== "/")
            .join("");
        res.status(405).json({ error: err.message });
    }
};

module.exports = { orderValidate };
