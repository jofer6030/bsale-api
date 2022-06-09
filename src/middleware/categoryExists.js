import { promisePool as pool } from "../config/dbConnect";

export const categoryExists = async (req, res, next) => {
  const { category } = req.params;
  try {
    const [categories] = await pool.query(
      "SELECT * FROM category WHERE name = ?",
      [category]
    );
    if (categories.length === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }
    req.category = categories[0];
    next();
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching category", error: error.message });
  }
};
