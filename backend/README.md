## ER Diagram
[Link to the PDF Document](src/public/er-diagram.pdf)

## Endpoint

- [Product Routes](#product-routes)
- [User Routes](#user-routes)
- [Cart Routes](#cart-routes)
- [CartItem Routes](#cart-items-routes)


### Product Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/products` | Get all products | |
| GET | `/products/:id` | Get product by ID ||
| PUT | `/products/search?category=:category` | Find products by category ||
| POST | `/products` | Create a product|`{title,description,category,price,stock?,brand?,image}`|
| PUT | `/products/:id` | Update product | |
| DELETE | `/products/:id` | Delete product | |

---
### User Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/users` | Get all users ||
| GET | `/users/:id` | Get user by ID | |
| GET | `/users/search?email=:email` | Find user by email | |
| POST | `/users/signup` | Create a user |`{email, password, username, role }`|
| POST | `/users/login` | Loing and set cookies with user associating company item |`{email, password}`|
| POST | `/users/checkAuth` | Check session ||
| GET | `/users/logout` | logout( clear cookies) ||
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
---
### Cart Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/carts` | Get all carts ||
| GET | `/carts/:id` | Get carts by ID | |
| POST | `/carts` | Create a cart |`{userId}`| 
| PUT | `/carts/:id` | Update cart |
| DELETE | `/carts/:id` | Delete cart |
---
### CartItem Routes

| Method | Endpoint | Description | Body |
|------|----------|------------|------------|
| GET | `/cart-items` | Get all cart-items ||
| GET | `/cart-items/:id` | Get cart-items by ID | |
| GET | `/cart-items/search?cartId=:cartId` | Find cart-items by cartId| |
| GET | `/cart-items/search?userId=:userId` | Find cart-items by userId| |
| POST | `/cart-items` | Create a cart-item |`{cartId,productId, quantity}`| 
| PUT | `/cart-items/:id` | Update cart-item |
| DELETE | `/cart-items/:id` | Delete cart-item |



