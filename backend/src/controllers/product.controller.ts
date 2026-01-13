import { Request, Response } from "express";
import { IProduct } from "../models/product.mode";
import productService from "../services/product.service";

//Get all Products
const getAllProduct = async(req: Request, res: Response) => {
  try{
    const products = await productService.getAll()
    res.status(200).json(products)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Product by id
const getProductById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const product = await productService.getByProductId(req.params.id)
    if(!product) {
      res.status(404).json({message: "Product not found"})
      return
    }
    res.status(200).json(product)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Product by query - category
const getProductByQuery = async(req: Request<{},{},{}, {category:string}>, res: Response) => {
  try{
    const {category} = req.query
    const products = await productService.findCompanyByCategory(category)
    if(!products) {
        res.status(404).json({message: `Products with category ${category} not found`})
        return
    }
    res.status(200).json(products)

  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create Product
const addProduct = async(req: Request<{}, IProduct>, res: Response) => {
  const {title,description,category,price,stock,brand,image}  = req.body

  if(!title||!description||!category||!price ||!brand) return

  try{
    const newProduct = await productService.add({title,description,category,price,stock,brand,image})
    if(!newProduct) {
      res.status(500).json({message: "Unable to add product"})
      return
    }
    res.status(201).json(newProduct)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update Product by id
const updateProductById = async(req: Request<{id: string}, Partial<IProduct>>, res: Response) => {
  const  {title,description,category,price,stock,brand,image,rating} = req.body
  try{
    const updatedProduct = await productService.update(req.params.id, {title,description,category,price,stock,brand,image,rating})

    if(!updatedProduct) {
      res.status(500).json({message: "Unable to update Product"})
      return
    }
    res.status(200).json(updatedProduct)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete Product by id
const deleteProductById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedProduct = await productService.remove(req.params.id)
    if(!deletedProduct) {
      res.status(500).json({message: "Unable to delete Product"})
      return
    }
    res.status(200).json(deletedProduct)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllProduct,
    getProductById,
    getProductByQuery,
    addProduct,
    updateProductById,
    deleteProductById
}