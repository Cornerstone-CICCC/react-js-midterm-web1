import { endpoint } from "."
import type { ICart } from "./cart"
import type { IProduct } from "./products"

export interface ICartItem{
    _id:string,
    cartId:string,
    productId:string,
    quantity:number
}

export interface ResultByCartId{
    _id:string,
    cartId:string,
    productId:IProduct,
    quantity:number
}

export const getCartItemByCartId = async(cartId:string):Promise<ResultByCartId[]|[]>=>{
    try{
        const res = await fetch(`${endpoint}/cart-items/search?cartId=${cartId}`,{
            method:"GET"
        })

        const data:ResultByCartId[] = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.error(err)
        return []
    }
}

export interface ResultByUserId{
    _id:string,
    carts:ICart,
    products:IProduct,
    quantity:number
}

//return the ResultByUserId[] which has something in the cart
export const getCartItemByUserId = async(userId:string):Promise<ResultByUserId[]|[]>=>{
    try{
        const res = await fetch(`${endpoint}/cart-items/search?userId=${userId}`)

        const data:ResultByUserId[] = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.error(err)
        return []
    }
}

interface AddCartItemPropety{
    productId:string,
    cartId:string,
    quantity?:number
}
//This function can be used to add or update
export const addCartItem= async(newCartItem:AddCartItemPropety):Promise<ICartItem|null>=>{
    try{
        const res = await fetch(`${endpoint}/cart-items`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(newCartItem)
        })

        const data:ICartItem = await res.json()
        console.log(data)

        return data
    }catch(err){
        console.error(err)
        return null
    }
}

//if quantity is 0, then item will be removed
export const updateCartItem = async(cartItemId:string,quantity:number):Promise<ICartItem|null>=>{
    try{
        const res = await fetch(`${endpoint}/cart-items/${cartItemId}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({quantity})
        })

        const data:ICartItem = await res.json()

        return data
    }catch(error){
        console.error(error)
        return null
    }
}

export const deleteCartItem = async(cartItemId:string)=>{
    try{
        const res = await fetch(`${endpoint}/cart-items/${cartItemId}`,{
            method:"DELETE"
        })

        const data = await res.json()
        return data
    }catch(error){
        console.error(error)
        return null
    }
}