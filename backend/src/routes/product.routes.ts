import { Router } from "express";
import productController from "../controllers/product.controller";

//Router
const productRouter = Router()

productRouter.get('/', productController.getAllProduct)
productRouter.post('/', productController.addProduct)
productRouter.get('/search', productController.getProductByQuery)
productRouter.get("/:id", productController.getProductById)
productRouter.put("/:id", productController.updateProductById)
productRouter.delete("/:id", productController.deleteProductById)

export default productRouter