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
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = require("../models/cart.model");
//get all carts
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.find();
});
//get cart by id
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findById(id);
});
//get carts by companyId
const getByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findOne({ userId, status: "active" });
});
//create cart
const add = (newCart) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = newCart;
    if (!userId)
        return null;
    const cart = yield getByUserId(userId.toString());
    //if active cart exist, retun 
    if (cart) {
        return;
    }
    return yield cart_model_1.Cart.create({
        userId,
        status: "active"
    });
});
//update cart
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findByIdAndUpdate(id, data, { new: true });
});
//delete cart
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findByIdAndDelete(id);
});
exports.default = {
    getAll,
    getById,
    getByUserId,
    add,
    update,
    remove,
};
