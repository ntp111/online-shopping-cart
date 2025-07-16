# 🛒 Shopping Cart Challenge

This project is an online shopping cart system. It allows users to browse products, add items to a shopping cart, apply discount codes, and complete orders. 

Additionally, the application also tracks customer sessions and stores order history for a day.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js (Express)
- **Database:** PostgreSQL
- **Deployment:** Azure App Service

---

## Deployed App
Access deployed version from here:

https://onlineshoppingcart-hecrfkfsh0cgdph8.australiaeast-01.azurewebsites.net/

---

## Features

- **Browse Products**
  - Products displayed with images and details.

- **Shopping Cart**
  - Add items to cart.
  - Remove items from cart.
  - Adjust item quantities.
  - Live order total calculation.

- **Order Confirmation**
  - Confirmation displayed after successful order placement.

- **Customer Order History**
  - A **customer ID** is randomly generated when a user first adds an item to their cart.
  - This ID is stored in the localStorage for a day and used to:
    - Save multiple orders placed by the same customer.
    - Retrieve past orders for display (access through "Your Orders" on navbar).

- **Discount Codes**
  - Enter `HAPPYHOURS` for an 18% discount.
  - Enter `BUYGETONE` to get the lowest-priced item for free.

- **Responsive Design**
  - Optimized for desktop, tablet, and mobile screens.

- **Interactive UI**
  - Hover and focus effects on buttons and inputs for better user experience.
  - "Move to Cart" button for mobile screen.

---

## Database Design

The application uses **PostgreSQL** with the following schema:

#### 1. Products
#### 2. Orders
#### 3. Order_Items
#### 4. Discounts

---

## How to Test Locally

### Prerequisites

- Node.js (v22)
- npm
- PostgreSQL (Connection to an Azure PostgreSQL instance)

---

### 1. Clone the Repository

```bash
git clone https://github.com/ntp111/online-shopping-cart.git
cd online-shopping-cart
cd back-end
```

### 2. Set Up Environment Variables
create .env file with database credentials. 
(credentials cannot be committed so information will be shared later)

.env file content:
POSTGRESQLCONNSTR_DATABASE_URL=postgresql://<username>:<password>@<server>:<port>/food_ordering?sslmode=require

add the .env file under "back-end" folder.


### 3. Set Up Front-end
Open new Terminal
```bash
cd online-shopping-cart
cd front-end
npm install
npm run build
```

### 4. Set Up Back-end
1. copy "dist" folder under "front-end" folder
2. past "dist" folder under "back-end" folder
3. Go back to Backend terminal and run the following
```bash
npm install
npm start
```

4. open "http://localhost:3000" to start testing locally


