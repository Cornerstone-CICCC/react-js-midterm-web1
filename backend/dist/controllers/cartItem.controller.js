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
const cartItem_service_1 = __importDefault(require("../services/cartItem.service"));
//Get all CartItems
const getAllCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield cartItem_service_1.default.getAll();
        res.status(200).json(cartItems);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Get CartItem by id
const getCartItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CartItem = yield cartItem_service_1.default.getById(req.params.id);
        if (!CartItem) {
            res.status(404).json({ message: "CartItem not found" });
            return;
        }
        res.status(200).json(CartItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Get CartItem by query
const getCartItemByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, userId } = req.query;
    console.log(cartId);
    try {
        if (userId) {
            const cartItems = yield cartItem_service_1.default.getByUserId(userId);
            if (!cartItems) {
                res.status(404).json({ message: "CartItem not found" });
                return;
            }
            res.status(200).json(cartItems);
            return;
        }
        else {
            const cartItems = yield cartItem_service_1.default.getByCartId(cartId);
            console.log(cartItems);
            if (!cartItems) {
                res.status(404).json({ message: "CartItem not found" });
                return;
            }
            res.status(200).json(cartItems);
            return;
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Create CartItem
const addCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, productId, quantity = 1 } = req.body;
    if (!cartId || !productId)
        return res.status(400).json({ message: "Missing cartId or productId" });
    try {
        //Look into cart to find matching products
        const existingItem = yield cartItem_service_1.default.findProductInCart(cartId, productId);
        console.log(existingItem);
        if (existingItem) {
            const updatedCart = yield cartItem_service_1.default.update(existingItem._id.toString(), { quantity: existingItem.quantity + quantity });
            console.log(updatedCart);
            res.status(201).json(updatedCart);
            return;
        }
        const newCartItem = yield cartItem_service_1.default.add({ cartId, productId, quantity });
        if (!newCartItem) {
            res.status(500).json({ message: "Unable to add CartItem" });
            return;
        }
        res.status(201).json(newCartItem);
        return;
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Update CartItem by id
const updateCartItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quantity } = req.body;
        if (quantity <= 0) {
            yield cartItem_service_1.default.remove(req.params.id);
            return res.status(200).json({ message: "item removed" });
        }
        const updatedCartItem = yield cartItem_service_1.default.update(req.params.id, { quantity });
        if (!updatedCartItem) {
            res.status(500).json({ message: "Unable to update CartItem" });
            return;
        }
        res.status(200).json(updatedCartItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Delete CartItem by id
const deleteCartItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCartItem = yield cartItem_service_1.default.remove(req.params.id);
        if (!deletedCartItem) {
            res.status(500).json({ message: "Unable to delete CartItem" });
            return;
        }
        res.status(200).json(deletedCartItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllCartItem,
    getCartItemById,
    getCartItemByQuery,
    addCartItem,
    updateCartItemById,
    deleteCartItemById
};
