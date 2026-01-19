import { Router } from "express";
import productController from "../controllers/product.controller";
import { adminOnly } from "../middleware/adminOnly";

//Router
const productRouter = Router()

productRouter.get('/', productController.getAllProduct)
productRouter.post('/', adminOnly,productController.addProduct)
productRouter.get('/search', productController.getProductByQuery)
productRouter.get("/:id", productController.getProductById)
productRouter.put("/:id", adminOnly,productController.updateProductById)
productRouter.delete("/:id", adminOnly,productController.deleteProductById)

export default productRouter