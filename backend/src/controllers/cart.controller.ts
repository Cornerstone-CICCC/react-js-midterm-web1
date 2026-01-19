import { Request, Response } from "express";
import { ICart } from "../models/cart.model";
import cartService from "../services/cart.service";

//Get all Cart
const getAllCart= async(req: Request, res: Response) => {
  try{
    const carts = await cartService.getAll()
    res.status(200).json(carts)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Cart by id
const getCartById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const cart = await cartService.getById(req.params.id)
    if(!cart) {
      res.status(404).json({message: "Cart not found"})
      return
    }
    res.status(200).json(cart)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create Cart
const addCart = async(req: Request<{}, ICart>, res: Response) => {
  const {userId}  = req.body
  console.log(userId)

  if(!userId) return

  try{
    const newCart = await cartService.add({userId})
    if(!newCart) {
      res.status(500).json({message: "Active cart exist"})
      return
    }
    res.status(201).json(newCart)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update Cart by id
const updateCartById = async(req: Request<{id: string}, Partial<ICart>>, res: Response) => {
  const  {userId, status} = req.body
  try{
    const updatedCart = await cartService.update(req.params.id, {userId, status})

    if(!updatedCart) {
      res.status(500).json({message: "Unable to update Cart"})
      return
    }
    res.status(200).json(updatedCart)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete Cart by id
const deleteCartById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedCart = await cartService.remove(req.params.id)
    if(!deletedCart) {
      res.status(500).json({message: "Unable to delete Cart"})
      return
    }
    res.status(200).json(deletedCart)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllCart,
    getCartById,
    addCart,
    updateCartById,
    deleteCartById
}