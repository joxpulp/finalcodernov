# Challenge Fullstack

E-commerce Backend Doc

Backend: https://finalcoder3.herokuapp.com/

## Local Setup:

Install dependencies

```bash
  npm install
```

Start the in dev mode with nodemoon

```bash
  npm run dev
```

Transpile ts files to /dist folder

```bash
  tsc
```

Start the server with transpiled files in /dist folder

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL` (MONGO ATLAS URL)

`CLOUD_NAME` (CLOUDINARY NAME)

`API_KEY` (CLOUDINARY API KEY)

`API_SECRET` (CLOUDINARY API SECRET)

`GMAIL_NAME` (GMAIL DISPLAYED NAME)

`GMAIL_EMAIL` (GMAIL EMAIL)

`GMAIL_PWD` (GMAIL APP PASSWORD)

`TWILIO_ACCOUNTID` (TWILIO ACCOUNT SID)

`TWILIO_AUTHTOKEN` (TWILIO AUTH TOKEN)

`TWILIO_PHONE` (TWILIO PHONE NUMBER)

`ADMIN_PHONE` (ADMIN PHONE)

## Endpoints:

## Auth:

| Method |                        Route                         |                                    Description |
| ------ | :--------------------------------------------------: | ---------------------------------------------: |
| POST   |   https://finalcoder3.herokuapp.com/api/auth/login   |                     Login by passing JSON body |
| GET    |  https://finalcoder3.herokuapp.com/api/auth/logout/  |                     Logout the current session |
| POST   |  https://finalcoder3.herokuapp.com/api/auth/signup   |               Signup by passing form-data body |
| GET    | https://finalcoder3.herokuapp.com/api/auth/islogged/ | Check if the user is logged, returns a boolean |

Login JSON body template:

```Typescript
{
    "email": "string",
    "password": "string"
}
```

Signup JSON body template:

| Field Type | Field Name |                            Description |
| ---------- | :--------: | -------------------------------------: |
| Text       |   email    |                 User's email, (string) |
| Text       |  password  |               User's password (string) |
| Text       |    name    |                  User's name, (string) |
| Text       |    age     |                    User's age (number) |
| Text       |  address   |                User's address (string) |
| Text       |   phone    | User's phone (string, incl. code area) |
| File       |   avatar   |        User's image (png, jpeg or jpg) |

## Products:

Public Routes:

| Method |                         Route                          |                                                              Description |
| ------ | :----------------------------------------------------: | -----------------------------------------------------------------------: |
| GET    |  https://finalcoder3.herokuapp.com/api/products/list/  |                                                        List all products |
| GET    | https://finalcoder3.herokuapp.com/api/products/list/id | List a product by id, if a product doesn't exist return an error message |

Protected Routes: `USER` needs to be logged to access this routes

| Method |                          Route                           |                                                                                  Description |
| ------ | :------------------------------------------------------: | -------------------------------------------------------------------------------------------: |
| POST   |   https://finalcoder3.herokuapp.com/api/products/add/    |                                                    Add a product by passing a form-data body |
| PUT    | https://finalcoder3.herokuapp.com/api/products/update/id | Updates a product by passing the product's id and a form-data body with the fields to update |
| DELETE | https://finalcoder3.herokuapp.com/api/products/delete/id |                           Delete a product from the product list by passing the product's id |

Product's form-data body (`POST` and `PUT`) template:

| Field Type | Field Name  |                        Description |
| ---------- | :---------: | ---------------------------------: |
| Text       |    title    |            Product's name (string) |
| Text       | description |     Product's description (string) |
| Text       |    code     |            Product's code (string) |
| Text       |    price    |           Product's price (number) |
| Text       |    stock    |           Product's stock (number) |
| File       |  thumbnail  | Product's image (png, jpeg or jpg) |

## Cart:

Protected Routes: `USER` needs to be logged to access this routes

| Method |                        Route                         |                                                                                                    Description |
| ------ | :--------------------------------------------------: | -------------------------------------------------------------------------------------------------------------: |
| GET    |   https://finalcoder3.herokuapp.com/api/cart/list    |                                                                                           List the user's cart |
| GET    |  https://finalcoder3.herokuapp.com/api/cart/list/id  |                List a product inside the user's cart by id, if a product doesn't exist return an error message |
| POST   |  https://finalcoder3.herokuapp.com/api/cart/add/id   | Add a product to the user's cart by the product id, if the same product is added the quantity field increments |
| DELETE | https://finalcoder3.herokuapp.com/api/cart/delete/id |                                Delete a product from the user's cart by the product id, no matter the quantity |

## Orders:

Protected Routes: `USER` needs to be logged to access this routes

| Method |                           Route                           |                                                                          Description |
| ------ | :-------------------------------------------------------: | -----------------------------------------------------------------------------------: |
| GET    | https://finalcoder3.herokuapp.com/api/orders/getpurchases |                                                                List user's purchases |
| POST   |   https://finalcoder3.herokuapp.com/api/orders/purchase   | Simulates a purchase, the user's cart is deleted and the products moved to purchases |
