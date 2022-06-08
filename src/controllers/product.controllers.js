import { promisePool as pool } from "../config/dbConnect";

export const getProducts = async (req, res) => {
  const { search, limit, offset } = req.query;
  let lisProducts;
  try {
    if (limit) {
      const [products] = await pool.query(
        "SELECT * FROM product LIMIT ? OFFSET ?",
        [Number(limit), Number(offset) || 0]
      );
      lisProducts = products;
    } else if (search) {
      const [products] = await pool.query(
        "SELECT * FROM product WHERE name REGEXP ?",
        [`^${search}`]
      );
      lisProducts = products;
    } else {
      const [products] = await pool.query("SELECT * FROM product LIMIT 10");
      lisProducts = products;
    }

    if (lisProducts.length === 0) {
      return res.status(204).json({ msg: "Products not found" });
    }

    return res
      .status(200)
      .json({ msg: "Products fetched successfully", lisProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req;
  try {
    const [products] = await pool.query(
      "SELECT p.id,p.name,p.url_image,p.price,p.discount,c.* FROM product p JOIN category c ON p.category=c.id WHERE p.category = ?",
      [category]
    );
    if (products.length === 0) {
      return res.status(204).json({ msg: "Products not found" });
    }
    res
      .status(200)
      .json({ msg: "Products fetched by category successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
};

export const getSearchProducts = async (req, res) => {};
