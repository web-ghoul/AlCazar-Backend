const {
  itemSchemaValidate,
  categorySchemaValidate,
} = require("../utils/shopSchemaValidate");

const itemValidate = async (req, res, next) => {
  req.body.data = JSON.parse(req.body.data);
  try {
    await itemSchemaValidate.validateAsync(req.body.data);
    next();
  } catch (err) {
    err.message = err.message
      .split("")
      .filter((char) => char !== '"' && char !== "/")
      .join("");
    res.status(405).json({ error: err.message });
  }
};

const categoryValidate = async (req, res, next) => {
  req.body.data = JSON.parse(req.body.data);
  try {
    await categorySchemaValidate.validateAsync(req.body.data);
    next();
  } catch (err) {
    err.message = err.message
      .split("")
      .filter((char) => char !== '"' && char !== "/")
      .join("");
    res.status(405).json({ error: err.message });
  }
};

module.exports = { itemValidate, categoryValidate };
