import { Product } from "../models/Product";

export const getProducts = async (req, res) => {
  let lisProducts;
  const { search, limit, offset, order } = req.query;
  try {
    if (limit) {
      lisProducts = await new Product.getProductsLimit(limit, offset);
    } else if (search) {
      lisProducts = await new Product.getProductsSearch(search, limit, offset);
    } else if (order) {
      lisProducts = await new Product.getProductsOrder(order, limit, offset);
    } else {
      lisProducts = await new Product.getProductsAll();
    }

    if (lisProducts.length === 0) {
      return res.status(204).json({ msg: "Products not found" });
    }

    const totalProducts = await new Product.getTotalProducts();

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
  const { limit, offset, order } = req.query;

  try {
    if (limit) {
      lisProducts = await new Product.getProductsByCategoryLimit(
        category,
        limit,
        offset
      );
    } else if (order) {
      lisProducts = await new Product.getProductsByCategoryOrder(
        category,
        order,
        limit,
        offset
      );
    } else {
      lisProducts = await new Product.getProductsByCategoryAll(category);
    }
    if (lisProducts.length === 0) {
      return res.status(204).json({ msg: "Products not found" });
    }

    const totalProductsByCategory =
      await new Product.getProductsByCategoryTotal(category);

    res.status(200).json({
      msg: "Products fetched by category successfully",
      categoryId: category,
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
