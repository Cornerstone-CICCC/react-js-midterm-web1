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
const product_mode_1 = require("../models/product.mode");
//get all products
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_mode_1.Product.find();
});
const getByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_mode_1.Product.findById(productId);
});
//find products by name
const findCompanyByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_mode_1.Product.find({ category });
    return products;
});
//create procudt
const add = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, category, price, stock, brand, image } = newProduct;
    if (!title || !description || !category || !price)
        return;
    return yield product_mode_1.Product.create({
        title,
        description,
        category,
        price,
        stock,
        brand,
        image
    });
});
//update product
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_mode_1.Product.findByIdAndUpdate(id, data, {
        new: true
    });
});
//delete company
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_mode_1.Product.findByIdAndDelete(id);
});
exports.default = {
    getAll,
    getByProductId,
    findCompanyByCategory,
    add,
    update,
    remove
};
