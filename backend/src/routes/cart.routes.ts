import { Router } from "express";
import cartController from "../controllers/cart.controller";

//Router
const cartRouter = Router()

cartRouter.get('/', cartController.getAllCart)
cartRouter.post('/', cartController.addCart)
cartRouter.get("/:id", cartController.getCartById)
cartRouter.put("/:id", cartController.updateCartById)
cartRouter.delete("/:id", cartController.deleteCartById)

export default cartRouter