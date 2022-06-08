import { Router } from "express";

import {
  getProducts,
  getProductsByCategory,
} from "../controllers/product.controllers";

import { categoryExists } from "../middleware/categoryExists";

const router = Router();

export const productRoutes = (app) => {
  app.use("/api/v1/product", router);

  router.get("/list", getProducts);
  router.get("/list/:category", categoryExists, getProductsByCategory);
};
