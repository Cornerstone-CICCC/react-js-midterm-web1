import { Types } from "mongoose"
import { ICartItem,CartItem } from "../models/cartItem.model"

//get all products
const getAll = async ()=>{
    return await CartItem.find()
}

const getById= async(id:string)=>{
    return await CartItem.findById(id)
}


const getByCartId = async(cartId:string)=>{
    return await CartItem.find({cartId}).populate("productId")
}

const getByUserId = async(userId:string)=>{
    return await CartItem.aggregate([
        {
            $lookup:{
                from:'carts',
                localField:'cartId',
                foreignField:'_id',
                as:'carts'
            }
        },
        {$unwind:'$carts'},
        {
            $match:{
                'carts.userId': new Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:'products',
                localField:'productId',
                foreignField:'_id',
                as:'products'
            }
        },
        {$unwind:'$products'}
    ])
}

//create procudt
const add = async(newCartItem:Partial<ICartItem>)=>{
    const {cartId,productId, quantity} = newCartItem
    if(!cartId||!productId||!quantity) return

    return await CartItem.create({
        cartId,
        productId,
        quantity
    })

}

//update product
const update = async(id:string, data:Partial<ICartItem>)=>{
    return await CartItem.findByIdAndUpdate(id, data,{
        new:true
    })
}

//delete company
const remove = async(id:string)=>{
    return await CartItem.findByIdAndDelete(id)
}

const findProductInCart = async(cartId:string, productId:string)=>{
    return await CartItem.findOne({cartId, productId})
}

export default{
    getAll,
    getById,
    getByUserId,
    getByCartId,
    add,
    update,
    remove,
    findProductInCart
}