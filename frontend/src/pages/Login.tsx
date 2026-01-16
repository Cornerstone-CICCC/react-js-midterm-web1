import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useUser } from "../context/user/UseUser";
import { login } from "../api/user";
import type { CartType } from "../context/user/UserContext";

export default function Login() {
  const navigate = useNavigate();
 const {setLogginUser,setActiveCartId, setCart, cart} = useUser()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // placeholders (we'll connect to AuthContext later)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // basic front validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      // TODO: replace with: await auth.login(email, password)
      //await new Promise((res) => setTimeout(res, 600));
      const data = await login({email, password})
      const loggedInUser = data?.result
      if(!loggedInUser){
        console.error("Log in fail")
        return
      }

      const user = loggedInUser.user

      const cartId = loggedInUser.cart? loggedInUser.cart._id:""
      const initialCartItems:CartType[] = !loggedInUser.cartItems?[]:
      loggedInUser.cartItems.map((item)=>(
        {
        cartItemId:item._id,
        _id:item.productId._id,
        title:item.productId.title,
        price:item.productId.price,
        brand:item.productId.brand,
        category:item.productId.category,
        description:item.productId.description,
        image:item.productId.image,
        stock:item.productId.stock,
        quantity:item.quantity
      })
      )

      setLogginUser(user)
      setActiveCartId(cartId)
      //Add stored cart itesm to cart context, if there are existing items, then increase the quantity
      setCart(prev =>{

        const updatedCart = [...prev]

        //Iterate though initialCartItem
        for(const newItem of initialCartItems){
          const existingitem = updatedCart.find(item => item._id === newItem._id)

          if(existingitem){
            existingitem.quantity+= newItem.quantity
          }else{
            updatedCart.push(newItem)
          }
        }

        //If new product -> add to cart
        return updatedCart
      })

      // TODO: after real login, redirect based on role (admin -> /admin)
      if(user.role==="admin"){
        navigate("/") //plz update the route admin dashboard
      }else{
        navigate("/products"); // or "/products" if Miya has that route
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome! Enter your details and start exploring."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-white/70 mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-purple-600 hover:bg-purple-700 py-2.5 font-semibold transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Helper links */}
        <div className="flex items-center justify-between text-sm">
          <Link
            to="/"
            className="text-white/60 hover:text-white underline underline-offset-4"
          >
            Back to Home
          </Link>

          {/* Optional: you can later add a /forgot route */}
          <button
            type="button"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            onClick={() => setError("Forgot password is not implemented yet.")}
          >
            Forgot password?
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
