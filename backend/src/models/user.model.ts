import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document{
  username: string,
  email:string,
  password: string,
  role:string
  cartId:mongoose.Types.ObjectId,
}

const UserSchema: Schema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
  email: {type: String, required: true},
  role: {type: String, required: true},
  cartId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}
}, {
  timestamps: true
})

export const User = mongoose.model<IUser>('User', UserSchema)