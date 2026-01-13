"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
//Router
const cartRouter = (0, express_1.Router)();
cartRouter.get('/', cart_controller_1.default.getAllCart);
cartRouter.post('/', cart_controller_1.default.addCart);
cartRouter.get("/:id", cart_controller_1.default.getCartById);
cartRouter.put("/:id", cart_controller_1.default.updateCartById);
cartRouter.delete("/:id", cart_controller_1.default.deleteCartById);
exports.default = cartRouter;
