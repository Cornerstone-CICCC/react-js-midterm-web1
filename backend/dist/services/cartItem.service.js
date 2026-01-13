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
const mongoose_1 = require("mongoose");
const cartItem_model_1 = require("../models/cartItem.model");
//get all products
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield cartItem_model_1.CartItem.find();
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cartItem_model_1.CartItem.findById(id);
});
const getByCartId = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cartItem_model_1.CartItem.find({ cartId }).populate("productId");
});
const getByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cartItem_model_1.CartItem.aggregate([
        {
            $lookup: {
                from: 'carts',
                localField: 'cartId',
                foreignField: '_id',
                as: 'carts'
            }
        },
        { $unwind: '$carts' },
        {
            $match: {
                'carts.userId': new mongoose_1.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'products'
            }
        },
        { $unwind: '$products' }
    ]);
});
//create procudt
const add = (newCartItem) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, productId, quantity } = newCartItem;
    if (!cartId || !productId || !quantity)
        return;
    return yield cartItem_model_1.CartItem.create({
        cartId,
        productId,
        quantity
    });
});
//update product
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cartItem_model_1.CartItem.findByIdAndUpdate(id, data, {
        new: true
    });
});
//delete company
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cartItem_model_1.CartItem.findByIdAndDelete(id);
});
exports.default = {
    getAll,
    getById,
    getByUserId,
    getByCartId,
    add,
    update,
    remove
};
