# E-Commerce Backend


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [API Endpoints](#api-endpoints)
5. [Usage](#usage)
6. [Contributions](#contributions)

---

### Introduction

This project serves as the backend for an E-Commerce platform. It has been built using Node.js, Express, and Sequelize ORM for the MySQL database. This backend application provides RESTful CRUD operations for managing categories, products, and tags in a relational database.

---

### Installation

To get started, please follow these steps:

- Clone the repository: `git clone https://github.com/yourusername/e-commerce-backend.git`
- Navigate to the project directory: `cd e-commerce-backend`
- Install dependencies: `npm install`

---

### Database Setup

Before running the application, you'll need to set up the database. Follow these steps:

- Run the MySQL shell and execute: `source db/schema.sql` to create the database.
- Use environment variables to securely store your MySQL username, password, and database name. Place them in a `.env` file at the root of your project.

---

### API Endpoints

The application provides the following API endpoints:

#### Categories
- `GET /api/categories`: Fetch all categories.
- `GET /api/categories/:id`: Fetch a single category by its `id`.
- `POST /api/categories`: Create a new category.
- `PUT /api/categories/:id`: Update a category by its `id`.
- `DELETE /api/categories/:id`: Delete a category by its `id`.

#### Products
- `GET /api/products`: Fetch all products.
- `GET /api/products/:id`: Fetch a single product by its `id`.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update a product by its `id`.
- `DELETE /api/products/:id`: Delete a product by its `id`.

#### Tags
- `GET /api/tags`: Fetch all tags.
- `GET /api/tags/:id`: Fetch a single tag by its `id`.
- `POST /api/tags`: Create a new tag.
- `PUT /api/tags/:id`: Update a tag by its `id`.
- `DELETE /api/tags/:id`: Delete a tag by its `id`.

---

### Usage

- After installing dependencies and setting up the database, run the server using `npm start`.
- Use a tool like Insomnia, Postman or CURL to interact with the API.

---

### Contributions

This project is open for contributions. Fork the repository and add your contributions. After adding your contributions, create a Pull Request.

---
Made with ❤️ by Aliviah Hilliard 2023