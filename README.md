# 📚 Book Shop API

A simple RESTful API for managing books using **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.  
This project follows the MVC architecture and supports full CRUD operations.

---

## 🚀 Features

- Get all books 📖
- Get a book by ID 🔍
- Add a new book ➕
- Update book details ✏️
- Delete a book ❌
- Clean project structure using MVC

---

## 🛠️ Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg (node-postgres)](https://node-postgres.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

---

## 🗄️ Database Design

Database: `book`  
Table: `books_shop`

| Column          | Type     | Description               |
|-----------------|----------|---------------------------|
| `id`            | SERIAL   | Primary key               |
| `title`         | TEXT     | Book title                |
| `author`        | TEXT     | Book author               |
| `price`         | FLOAT    | Book price                |
| `published_date`| DATE     | Date published            |

