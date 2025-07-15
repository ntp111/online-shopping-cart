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
    - Retrieve past orders for display.
  - Access Order History through "Your Orders" on Navbar

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
#### 4.Discounts

---

## How to Test Locally

### Prerequisites

- Node.js (v18+ recommended)
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
(credentials cannot be committed so please check from db_credential.jpg image to generate the .env file)

### 3. Install Dependencies and Run the Server

```bash
npm install
npm start
```

### Deployed App
You can test the deployed version here:

https://onlineshoppingcart-hecrfkfsh0cgdph8.australiaeast-01.azurewebsites.net/


