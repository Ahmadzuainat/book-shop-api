import { Request, Response } from "express";
import pool from "../model/DB";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM books_shop");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getbyidbook = async (req: Request, res: Response) => {
  const id = +req.params.id;
  try {
    const result = await pool.query("SELECT * FROM books_shop WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postbook = async (req: Request, res: Response) => {
  const { title, author, price, published_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO books_shop (title, author, price, published_date) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, author, price, published_date]
    );
    res.status(201).json({ message: "New book added", book: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatebook = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const { title, author, price, published_date } = req.body;
  try {
    const result = await pool.query(
      `UPDATE books_shop SET title = $1, author = $2, price = $3, published_date = $4 WHERE id = $5 RETURNING *`,
      [title, author, price, published_date, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json({ message: "Book updated", book: result.rows[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletebook = async (req: Request, res: Response) => {
  const id = +req.params.id;
  try {
    const result = await pool.query("DELETE FROM books_shop WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json({ message: "Book deleted", deletedBook: result.rows[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
