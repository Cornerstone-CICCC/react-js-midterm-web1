import mongoose, {Schema, Document} from "mongoose";

export interface IProduct extends Document{
    title:string,
    description:string,
    category:string,
    price:number,
    rating:number,
    stock:number
    brand:string,
    image:string
}

const ProductSchema :Schema = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    price:{type:Number, required:true},
    rating:{type:Number},
    stock:{type:Number},
    brand:{type:String},
    image:{type:String}
},{
    timestamps:true
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema)