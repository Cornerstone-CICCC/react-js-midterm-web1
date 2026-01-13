import { Router } from "express";
import cartItemController from "../controllers/cartItem.controller";

//Router
const cartItemRouter = Router()

cartItemRouter.get('/', cartItemController.getAllCartItem)
cartItemRouter.post('/', cartItemController.addCartItem)
cartItemRouter.get('/search', cartItemController.getCartItemByQuery)

cartItemRouter.get("/:id", cartItemController.getCartItemById)
cartItemRouter.put("/:id", cartItemController.updateCartItemById)
cartItemRouter.delete("/:id", cartItemController.deleteCartItemById)

export default cartItemRouter