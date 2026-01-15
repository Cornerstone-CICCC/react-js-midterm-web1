"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cart_service_1 = __importDefault(require("./cart.service"));
const cartItem_service_1 = __importDefault(require("./cartItem.service"));
//get all users
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
//get user by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(id);
});
const getValidateByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find({ email });
});
//get user by email for login
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ email }).select('+password');
});
//create user
const add = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = newUser;
    if (!username || !email || !password || !role)
        return;
    const user = yield user_model_1.User.find({ email });
    console.log(user);
    if (user.length > 0) {
        return;
    }
    const hasedPassword = yield bcrypt_1.default.hash(password, 12);
    return yield user_model_1.User.create({
        email,
        username,
        password: hasedPassword,
        role
    });
});
//update user
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, data, { new: true });
});
//delete user
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndDelete(id);
});
//login user, return user account for admin, user and cart for customer
const login = (details) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = details;
    const foundUser = yield getByEmail(email);
    if (!foundUser)
        return false;
    const isMatch = yield bcrypt_1.default.compare(password, foundUser.password);
    if (!isMatch)
        return false;
    if (foundUser.role === "admin") {
        return {
            user: foundUser,
            cart: null,
            cartItem: []
        };
    }
    //look for active cart
    const cart = yield cart_service_1.default.getByUserId(foundUser._id.toString());
    let cartItems = [];
    //if active cart exist then fetch cartItem populated by prodcuct
    if (cart) {
        cartItems = yield cartItem_service_1.default.getByCartId(cart._id.toString());
    }
    return {
        user: foundUser,
        cart,
        cartItems: cartItems
    };
});
exports.default = {
    getAll,
    getById,
    getByEmail,
    getValidateByEmail,
    add,
    update,
    remove,
    login
};
