import { ICart, Cart } from '../models/cart.model'

//get all carts
const getAll = async()=>{
    return await Cart.find()
}

//get cart by id
const getById = async(id:string)=>{
    return await Cart.findById(id)
}

//get carts by companyId
const getByUserId = async(userId:string)=>{
    return await Cart.findOne({userId, status:"active"})
}

//create cart
const add = async (newCart:Partial<ICart>)=>{
    const {userId} = newCart
    if(!userId) return null

    const cart = await getByUserId(userId.toString())

    //if cart exist, retun 
    if(cart){
        return
    }

    return await Cart.create({
        userId,
        status:"active"
    })
}

//update cart
const update = async(id:string, data:Partial<ICart>)=>{
    return await Cart.findByIdAndUpdate(id, data,{new:true})
}

//delete cart
const remove = async(id:string)=>{
    return await Cart.findByIdAndDelete(id)
}


export default{
    getAll,
    getById,
    getByUserId,
    add,
    update,
    remove,
}