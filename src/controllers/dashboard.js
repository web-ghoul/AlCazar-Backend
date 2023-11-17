const uploadImage = require("../utils/uploadImage");
const Item = require("../models/item");
const Order = require("../models/order");
const Category = require("../models/category");
const Subscription = require("../models/subscription");
const User = require("../models/user");
const Address = require("../models/address");


//Categories

const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        if (category) {
            await Category.findOneAndDelete({ _id: categoryId });
            res.status(200).json({ message: "Category is Deleted Successfully!!" });
        } else {
            res.status(404).json({ error: "Category isn't Exist" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
};

const addNewCategory = async (req, res, next) => {
    try {
        req.body = req.body.data;
        const { title } = req.body;
        const category = await Category.findOne({ title });
        if (category) {
            res.status(401).json({
                error: "Title is already Exist , Please Choose Another Title",
            });
        } else {
            //Upload Image
            const image = await uploadImage(req.files[0]);
            req.body.image = image;
            await Category.create({ admin: req.userId, ...req.body });
            return res
                .status(200)
                .json({ message: "Category is Added Successfully!!" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
};

const editCategory = async (req, res, next) => {
    try {
        req.body = req.body.data
        const { categoryId } = req.params
        const { title } = req.body;
        const isExist = await Category.findOne({ _id: categoryId })
        if (isExist) {
            const category = await Category.findOne({ title });
            if (category && category._id != categoryId) {
                res.status(401).json({
                    error: "Title is already Exist , Please Choose Another Title",
                });
            } else {
                //Upload Image
                if (req.files && req.files.length > 0) {
                    const image = await uploadImage(req.files[0]);
                    req.body.image = image;
                } else {
                    req.body.image = req.body.image[0]
                }
                await Category.findOneAndUpdate({ _id: categoryId }, req.body)
                return res
                    .status(200)
                    .json({ message: "Category is Edited Successfully!!" });
            }
        } else {
            res.status(404).json({
                error: "Category isn't Exist",
            });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
};

//Items

const addNewItem = async (req, res, next) => {
    try {
        req.body = req.body.data;
        const { title } = req.body;
        const item = await Item.findOne({ title });
        if (item) {
            res.status(401).json({
                error: "Title is already Exist , Please Choose Another Title",
            });
        } else {
            //Upload Images
            const images = [];
            for (let i = 0; i < req.files.length; i++) {
                const image = await uploadImage(req.files[i]);
                images.push(image);
            }
            req.body.images = images;
            await Item.create({ admin: req.userId, ...req.body });
            return res
                .status(200)
                .json({ message: "Item is Created Successfully!!" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
};

const deleteItem = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        const item = await Item.findOne({ _id: itemId });
        if (item) {
            await Item.findOneAndDelete({ _id: itemId });
            res.status(200).json({ message: "Item is Deleted Successfully!!" });
        } else {
            res.status(404).json({ error: "Item isn't Exist" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
};

const editItem = async (req, res, next) => {
    try {
        req.body = req.body.data;
        const { itemId } = req.params
        const { title } = req.body;
        const isExist = await Item.findOne({ _id: itemId })
        if (isExist) {
            const item = await Item.findOne({ title });
            if (item && item._id != itemId) {
                res.status(401).json({
                    error: "Title is already Exist , Please Choose Another Title",
                });
            } else {
                //Upload Images
                if (req.files && req.files.length > 0) {
                    const images = [];
                    for (let i = 0; i < req.files.length; i++) {
                        const image = await uploadImage(req.files[i]);
                        images.push(image);
                    }
                    req.body.images = images;
                }
                await Item.findOneAndUpdate({ _id: itemId }, req.body);
                return res
                    .status(200)
                    .json({ message: "Item is Edited Successfully!!" });
            }
        }
        else {
            res.status(401).json({
                error: "Item isn't Exist",
            });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
};


//Users

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id })
        if (user) {
            if (user.isAdmin) {
                res.status(401).json({ error: "it's not Allowed" });
            } else {
                const addresses = await Address.find({ userId: id })
                const orders = await Order.find({ userId: id })
                const subscriptions = await Subscription.find({ userId: id })
                res.status(200).json({ user, addresses, orders, subscriptions });
            }
        } else {
            res.status(404).json({ error: "User isn't Exist" });
        }
    } catch (error) {
        res.status(405).json({ error: err.message });
    }
}

const getUsers = async (req, res, next) => {
    try {
        const { search, sort } = req.query
        let searchForFirstName, searchForLastName;
        if (search) {
            const searchToArray = search.split(" ")
            searchForFirstName = searchToArray[0]
            if (searchToArray.length > 1) {
                searchForLastName = searchToArray[1]
            }
        }
        const users = await User.find(
            {
                isAdmin: false,
                firstName: { $regex: searchForFirstName ? searchForFirstName : "", $options: "i" },
                lastName: { $regex: searchForLastName ? searchForLastName : "", $options: "i" }
            }).sort(sort)
        res.status(200).json({ users });
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.findOne({ _id: userId })
        if (user) {
            await User.findOneAndDelete({ _id: userId })
            res.status(200).json({ message: "User is Deleted Successfully!!" })
        } else {
            res.status(404).json({ error: "User isn't Exist" })
        }
    } catch (error) {
        res.status(405).json({ error: err.message });
    }
}

const editUser = async (req, res, next) => {
    try {
        req.body = req.body.data
        const { userId } = req.params
        const { email } = req.body
        const isExist = await User.findOne({ _id: userId })
        if (isExist) {
            const user = await User.findOne({ email: email })
            if (user && user._id != userId) {
                res.status(401).json({ error: "Email is Already Exist" });
            } else {
                //Upload File
                if (req.files && req.files.length > 0) {
                    if (req.files[0].size > 1024 * 10240) {
                        res.status(402).json({ error: "Images Size is too large your limit for a image is 10MG" });
                    }
                    const avatar = await uploadImage(req.files[0]);
                    req.body.avatar = avatar
                } else {
                    req.body.avatar = req.body.avatar[0]
                }
                await User.findOneAndUpdate({ _id: userId }, req.body)
                res.status(200).json({ message: "User is Edited Successfully!!" });
            }
        } else {
            res.status(404).json({ error: "User isn't Exist" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}

const addNewAddress = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.userId })
        if (user) {
            const address = await Address.findOne({ userId: req.body.userId, address: req.body.address })
            if (address) {
                res.status(400).json({ error: "Address is already Exist" })
            } else {
                const newAddress = new Address(req.body)
                await newAddress.save()
                res.status(200).json({ message: "Address is Added Successfully!!" });
            }
        } else {
            res.status(404).json({ error: "User is not Exist" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}

const deleteAddress = async (req, res, next) => {
    try {
        const { userId, addressId } = req.params
        const user = await User.findOne({ _id: userId })
        if (user) {
            await Address.findByIdAndDelete(addressId)
            res.status(200).json({ message: "Address is Added Successfully!!" });
        } else {
            res.status(404).json({ error: "User is not Exist" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}

const editAddress = async (req, res, next) => {
    try {
        const { userId, addressId } = req.params
        const user = await User.findOne({ _id: userId })
        if (user) {
            await Address.findByIdAndUpdate(addressId, req.body)
            res.status(200).json({ message: "Address is Updated Successfully!!" });
        } else {
            res.status(404).json({ error: "User is not Exist" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}

const deleteSubscriptedEmail = async (req, res, next) => {
    try {
        const { userId, subscriptedEmailId } = req.params
        const user = await User.findOne({ _id: userId })
        if (user) {
            const emailIsExist = await Subscription.findOne({ _id: subscriptedEmailId })
            if (emailIsExist) {
                await Subscription.findOneAndDelete({ _id: subscriptedEmailId })
                return res.status(200).json({ message: "Subscripted Email is Deleted Successfully!!" });
            } else {
                return res.status(404).json({ error: "Email is'nt Found in Subscripted Emails List" });
            }
        } else {
            res.status(404).json({ error: "User is not Exist" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}

const changeAvatar = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.findOne({ _id: userId })
        if (user) {
            if (req.files && req.files.length > 0) {
                if (req.files[0].size > 1024 * 10240) {
                    return res.status(402).json({ error: "Images Size is too large your limit for a image is 10MG" });
                }
                const avatar = await uploadImage(req.files[0]);
                await User.findOneAndUpdate({ _id: userId }, { avatar: avatar })
                return res.status(200).json({ message: "Avatar is Changed Successfully!!" });
            } else {
                res.status(404).json({ error: "Data is not founded" });
            }
        } else {
            return res.status(404).json({ error: "User is not Exist" });
        }
    } catch (err) {
        return res.status(405).json({ error: err.message });
    }
}


//Admins

const makeUserAdmin = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (user) {
            if (user.isAdmin) {
                res.status(400).json({ error: "User is already Admin" });
            } else {
                await User.findOneAndUpdate({ email }, { isAdmin: true })
                res.status(200).json({ message: "User has been Admin Successfully!!" });
            }
        } else {
            res.status(404).json({ error: "User isn't Exist" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}



module.exports = {
    deleteItem,
    addNewItem,
    editItem,
    deleteCategory,
    addNewCategory,
    deleteUser,
    getUser,
    getUsers,
    editCategory,
    editUser,
    makeUserAdmin,
    addNewAddress,
    deleteAddress,
    editAddress,
    deleteSubscriptedEmail,
    changeAvatar
};
