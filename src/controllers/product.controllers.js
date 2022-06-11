import { Product } from "../models/Product";

export const getProducts = async (req, res) => {
  let lisProducts;
  const { search, limit, offset, order, price } = req.query;
  try {
    if (search) {
      lisProducts = await Product.getProductsSearch(search, limit, offset);
    } else if (order) {
      lisProducts = await Product.getProductsOrder(order, limit, offset);
    } else if (price) {
      lisProducts = await Product.getProductsPrice(price, limit, offset);
    } else {
      lisProducts = await Product.getProductsAll(limit, offset);
    }

    if (lisProducts.length === 0) {
      return res.status(204).json({ msg: "Products not found" });
    }

    const totalProducts = await Product.getTotalProducts();

    return res.status(200).json({
      msg: "Products fetched successfully",
      count: totalProducts,
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
      products: lisProducts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  let lisProducts;
  const { category } = req;
  const { limit, offset, order, price } = req.query;

  try {
    if (order) {
      lisProducts = await Product.getProductsByCategoryOrder(
        category.id,
        order,
        limit,
        offset
      );
    } else if (price) {
      lisProducts = await Product.getProductsByCategoryPrice(
        category.id,
        price,
        limit,
        offset
      );
    } else {
      lisProducts = await Product.getProductsByCategoryAll(
        category.id,
        limit,
        offset
      );
    }
    if (lisProducts.length === 0) {
      return res.status(204).json({ msg: "Products not found" });
    }

    const totalProductsByCategory = await Product.getProductsByCategoryTotal(
      category.id
    );

    res.status(200).json({
      msg: "Products fetched by category successfully",
      categoryId: category.id,
      count: totalProductsByCategory,
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
      products: lisProducts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
};

export const getSearchProducts = async (req, res) => {};
