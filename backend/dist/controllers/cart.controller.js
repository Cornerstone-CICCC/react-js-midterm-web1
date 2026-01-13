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
const cart_service_1 = __importDefault(require("../services/cart.service"));
//Get all Cart
const getAllCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cart_service_1.default.getAll();
        res.status(200).json(carts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Get Cart by id
const getCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_service_1.default.getById(req.params.id);
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.status(200).json(cart);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Create Cart
const addCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId)
        return;
    try {
        const newCart = yield cart_service_1.default.add({ userId });
        if (!newCart) {
            res.status(500).json({ message: "Unable to add Cart" });
            return;
        }
        res.status(201).json(newCart);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
//Update Cart by id
const updateCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, status } = req.body;
    try {
        const updatedCart = yield cart_service_1.default.update(req.params.id, { userId, status });
        if (!updatedCart) {
            res.status(500).json({ message: "Unable to update Cart" });
            return;
        }
        res.status(200).json(updatedCart);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Delete Cart by id
const deleteCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCart = yield cart_service_1.default.remove(req.params.id);
        if (!deletedCart) {
            res.status(500).json({ message: "Unable to delete Cart" });
            return;
        }
        res.status(200).json(deletedCart);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllCart,
    getCartById,
    addCart,
    updateCartById,
    deleteCartById
};
