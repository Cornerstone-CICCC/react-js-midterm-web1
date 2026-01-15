"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartItem_controller_1 = __importDefault(require("../controllers/cartItem.controller"));
//Router
const cartItemRouter = (0, express_1.Router)();
cartItemRouter.get('/', cartItem_controller_1.default.getAllCartItem);
cartItemRouter.post('/', cartItem_controller_1.default.addCartItem);
cartItemRouter.get('/search', cartItem_controller_1.default.getCartItemByQuery);
cartItemRouter.get("/:id", cartItem_controller_1.default.getCartItemById);
cartItemRouter.put("/:id", cartItem_controller_1.default.updateCartItemById);
cartItemRouter.delete("/:id", cartItem_controller_1.default.deleteCartItemById);
exports.default = cartItemRouter;
