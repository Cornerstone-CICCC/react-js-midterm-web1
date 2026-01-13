import { endpoint } from "."

export interface ICart{
    _id:string,
    userId:string,
    status:string
}

export const createCart = async(userId:string):Promise<ICart|null>=>{
    try{
        const res = await fetch(`${endpoint}/carts`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({userId:userId})
        })

        const data = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.error(err)
        return null
    }
}

export const UpdateCart = async(cartId:string, updates:Partial<ICart>):Promise<ICart|null>=>{
    try{
        const res = await fetch(`${endpoint}/carts/${cartId}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(updates)
        })

        const data:ICart = await res.json()
        return data
    }catch(err){
        console.error(err)
        return null
    }
}

export const getCartByID = async(cartId:string):Promise<ICart|null>=>{
    try{
        const res = await fetch(`${endpoint}/carts/${cartId}`,{
            method:"GET"
        })

        const data:ICart = await res.json()
        return data
    }catch(err){
        console.error(err)
        return null
    }
}

export const deleteCartByID = async(cartId:string):Promise<boolean>=>{
    try{
        const res = await fetch(`${endpoint}/carts/${cartId}`)

        const data = await res.json()

        if(!data){
            return false
        }
        return true

    }catch(error){
        console.error(error)
        return false
    }
}