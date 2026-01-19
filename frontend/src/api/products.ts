import { endpoint } from "."

export interface IProduct{
    _id:string,
    title:string,
    description:string,
    category:string,
    createdAt?: string,
    price:number,
    stock?:number,
    rating?:number,
    image:string
    brand:string
}

export const getAllProducts = async():Promise<IProduct[]>=>{
    try{
        const res = await fetch(`${endpoint}/products`,{
            method:"GET"
        })

        if(!res.ok){
            console.error("Failed to fetch products")
        }

        const data:IProduct[] = await res.json()
        return data
    }catch(err){
        console.log(err)
        return []
    }
}

export const getProductById = async(productId:string):Promise<IProduct| null>=>{
    try{
        const res = await fetch(`${endpoint}/products/${productId}`,{
            method:"GET"
        })

        if(!res.ok){
            console.error("Failed to fetch products")
        }

        const data:IProduct= await res.json()

        return data
    }catch(error){
        console.error(error)
        return null
    }
}

export const updateProductById = async(prodcutId:string,data:Partial<IProduct>):Promise<IProduct| null>=>{
    try{
        const res = await fetch(`${endpoint}/products/${prodcutId}`,{
            method:"PUT",
            credentials: "include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })

        if(!res.ok){
            console.error("Failed to fetch products")
        }

        const updatedData:IProduct = await res.json()

        return updatedData

    }catch(error){
        console.error(error)
        return null
    }
}

export const addProduct = async(productData:Partial<IProduct>):Promise<IProduct| null>=>{
    
    try{
        console.log(productData)
        const res = await fetch(`${endpoint}/products`,{
            method:"POST",
            credentials: "include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(productData)
        })

        console.log(res)


        if(!res.ok){
            console.error("Failed to create products")
        }

        const newProduct:IProduct = await res.json()
        console.log(newProduct)

        return newProduct
    }catch(err){
        console.error(err)
        return null
    }
}

export const deleteProduct = async(productId:string):Promise<boolean>=>{
    try{
        const res= await fetch(`${endpoint}/products/${productId}`,{
            method:"DELETE",
            credentials: "include"
        })

        const deletedProduct:IProduct = await res.json()

        if(!deletedProduct){
            return false
        }
        return true
    }catch(err){
        console.error(err)
        return false
    }
}