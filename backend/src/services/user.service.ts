import { IUser, User } from "../models/user.model";
import bcrypt from 'bcrypt'
import cartService from "./cart.service";
import { CartItem, ICartItem } from "../models/cartItem.model";
import cartItemService from "./cartItem.service";
import { ICart } from "../models/cart.model";

//get all users
const getAll = async()=>{
    return await User.find()
}

//get user by id
const getById = async(id:string)=>{
    return await User.findById(id)
}

const getValidateByEmail = async(email:string)=>{
    return await User.find({email})
}

//get user by email for login
const getByEmail = async(email:string)=>{
    return await User.findOne({email}).select('+password')
}

//create user
const add = async (newUser:Partial<IUser>)=>{
    const {username, email, password, role} = newUser
    if(!username||!email ||!password||!role) return

    const user = await User.find({email})
    console.log(user)

    if(user.length>0){
        return
    }

    const hasedPassword = await bcrypt.hash(password,12)

    return await User.create({
        email,
        username,
        password:hasedPassword,
        role
    })
}

//update user
const update = async(id:string, data:Partial<IUser>)=>{
    return await User.findByIdAndUpdate(id, data,{new:true})
}

//delete user
const remove = async(id:string)=>{
    return await User.findByIdAndDelete(id)
}


export interface IUserLogin{
    email:string
    password:string
}

//login user, return user account for admin, user and cart for customer
const login = async(details:IUserLogin)=>{
    const {email, password} = details
    const foundUser = await getByEmail(email)

    if(!foundUser) return false

    const isMatch = await bcrypt.compare(password, foundUser.password)

    if(!isMatch) return false

    if(foundUser.role === "admin"){
        return {
            user:foundUser,
            cart:null,
            cartItem:[]
        }
    }

    //look for active cart
    const cart:ICart|null = await cartService.getByUserId(foundUser._id.toString())
    let cartItems :ICartItem[] =[]

    //if active cart exist then fetch cartItem populated by prodcuct
    if(cart){
        cartItems = await cartItemService.getByCartId(cart._id.toString())
    }

    return{
        user:foundUser,
        cart,
        cartItems:cartItems
    }

}

export default{
    getAll,
    getById,
    getByEmail,
    getValidateByEmail,
    add,
    update,
    remove,
    login
}