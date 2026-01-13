import { Request, Response } from "express";
import { ICartItem } from "../models/cartItem.model";
import cartItemService from "../services/cartItem.service";

//Get all CartItems
const getAllCartItem= async(req: Request, res: Response) => {
  try{
    const cartItems = await cartItemService.getAll()
    res.status(200).json(cartItems)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get CartItem by id
const getCartItemById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const CartItem = await cartItemService.getById(req.params.id)
    if(!CartItem) {
      res.status(404).json({message: "CartItem not found"})
      return
    }
    res.status(200).json(CartItem)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
//Get CartItem by query
const getCartItemByQuery = async(req: Request<{},{},{},{cartId:string, userId:string}>, res: Response) => {
    const {cartId, userId} = req.query
    console.log(cartId)
    try{

        if(userId){
            const cartItems = await cartItemService.getByUserId(userId)

            if(!cartItems) {
            res.status(404).json({message: "CartItem not found"})
            return
            }

            res.status(200).json(cartItems)
            return 
        }else{
            const cartItems = await cartItemService.getByCartId(cartId)
            if(!cartItems) {
                res.status(404).json({message: "CartItem not found"})
                return
            }

            res.status(200).json(cartItems)
            return 

        }
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create CartItem
const addCartItem = async(req: Request<{}, ICartItem>, res: Response) => {
  const {cartId,productId, quantity}  = req.body

  if(!cartId|| !productId||!quantity) return

  try{
    const newCartItem = await cartItemService.add({cartId,productId, quantity})
    if(!newCartItem) {
      res.status(500).json({message: "Unable to add CartItem"})
      return
    }
    res.status(201).json(newCartItem)
    return
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update CartItem by id
const updateCartItemById = async(req: Request<{id: string}, Partial<ICartItem>>, res: Response) => {
  const  {productId, quantity} = req.body
  try{
    const updatedCartItem = await cartItemService.update(req.params.id,  {productId, quantity})

    if(!updatedCartItem) {
      res.status(500).json({message: "Unable to update CartItem"})
      return
    }
    res.status(200).json(updatedCartItem)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete CartItem by id
const deleteCartItemById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedCartItem = await cartItemService.remove(req.params.id)
    if(!deletedCartItem) {
      res.status(500).json({message: "Unable to delete CartItem"})
      return
    }
    res.status(200).json(deletedCartItem)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllCartItem,
    getCartItemById,
    getCartItemByQuery,
    addCartItem,
    updateCartItemById,
    deleteCartItemById
}