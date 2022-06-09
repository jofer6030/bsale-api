import { promisePool as pool } from "../config/dbConnect";

export class Product {
  static async getTotalProducts() {
    const [products] = await pool.query("SELECT * FROM product");
    return products.length;
  }

  static async getProductsAll(limit, offset) {
    const [products] = await pool.query(
      "SELECT * FROM product LIMIT ? OFFSET ?",
      [Number(limit) || 10, Number(offset) || 0]
    );
    return products;
  }

  static async getProductsSearch(search, limit, offset) {
    const [products] = await pool.query(
      "SELECT * FROM product WHERE name REGEXP ? LIMIT ? OFFSET ?",
      [`^${search}`, Number(limit) || 10, Number(offset) || 0]
    );
    return products;
  }

  static async getProductsOrder(order, limit, offset) {
    const [products] = await pool.query(
      `SELECT * FROM product ORDER BY name ${order} LIMIT ? OFFSET ?`,
      [Number(limit) || 10, Number(offset) || 0]
    );
    return products;
  }

  static async getProductsByCategoryTotal(category) {
    const [products] = await pool.query(
      "SELECT p.id,p.name,p.url_image,p.price,p.discount,c.name FROM product p JOIN category c ON p.category=c.id WHERE p.category = ?",
      [category]
    );
    return products.length;
  }

  static async getProductsByCategoryAll(category, limit, offset) {
    const [products] = await pool.query(
      "SELECT p.id,p.name,p.url_image,p.price,p.discount,c.name as category FROM product p JOIN category c ON p.category=c.id WHERE p.category = ? LIMIT ? OFFSET ?",
      [category, Number(limit) || 10, Number(offset) || 0]
    );
    return products;
  }

  static async getProductsByCategoryOrder(category, order, limit, offset) {
    const [products] = await pool.query(
      `SELECT p.id,p.name,p.url_image,p.price,p.discount,c.name FROM product p JOIN category c ON p.category=c.id WHERE p.category = ? ORDER BY p.name ${order} LIMIT ? OFFSET ?`,
      [category, Number(limit) || 10, Number(offset) || 0]
    );
    return products;
  }
}
