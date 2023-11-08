const Item = require("../models/item");
const Category = require("../models/category");

const getItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({ _id: itemId }).populate("admin");
    if (item) {
      res.status(200).json({ item });
    } else {
      res.status(404).json({ error: "Item isn't Found" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getItems = async (req, res, next) => {
  try {
    const { search, sort, category, dimension } = req.query
    let width = ""
    let length = ""
    let height = ""
    if (dimension) {
      let arr = dimension.split(" x ")
      width = arr[1].slice(1)
      length = arr[0].slice(1)
      height = arr[2].slice(1)
    }
    const items = await Item.find(
      {
        title: { $regex: search ? search : "", $options: "i" }, category: { $regex: category ? category : "" }, $or: [
          { width: width ? width : { $exists: true } },
          { width: { $exists: false } },
        ], $or: [
          { length: length ? length : { $exists: true } },
          { length: { $exists: false } },
        ], $or: [
          { height: height ? height : { $exists: true } },
          { height: { $exists: false } },
        ]
      }).populate("admin").sort(sort)
    res.status(200).json({ items });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).populate("admin");
    res.status(200).json({ categories });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getDimensions = async (req, res, next) => {
  try {
    const items = await Item.find({})
    let dimensions = []
    items.map((item) => {
      const d = "L" + item.length + " x " + "W" + item.width + " x " + "H" + item.height
      if (!dimensions.includes(d)) {
        dimensions.push(d)
      }
    })
    res.status(200).json({ dimensions })
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

module.exports = {
  getItems,
  getItem,
  getCategories,
  getDimensions
};
