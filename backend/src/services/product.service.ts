import { IProduct, Product } from "../models/product.mode"

//get all products
const getAll = async ()=>{
    return await Product.find()
}


const getByProductId = async(productId:string)=>{
    return await Product.findById(productId)
}

//find products by name
const findCompanyByCategory= async(category:string)=>{
    const products = await Product.find({category})

    return products
}

//create procudt
const add = async(newProduct:Partial<IProduct>)=>{
    const {title,description,category,price,stock,brand,images} = newProduct
    if(!title||!description||!category||!price ||!brand) return

    return await Product.create({
        title,
        description,
        category,
        price,
        stock,
        brand,
        images
    })

}

//update product
const update = async(id:string, data:Partial<IProduct>)=>{
    return await Product.findByIdAndUpdate(id, data,{
        new:true
    })
}

//delete company
const remove = async(id:string)=>{
    return await Product.findByIdAndDelete(id)
}

export default{
    getAll,
    getByProductId,
    findCompanyByCategory,
    add,
    update,
    remove
}