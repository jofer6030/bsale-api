import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { productRoutes } from "./routes/product.routes";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.middlewares();
    this.routes();
    this.listen();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }

  routes() {
    productRoutes(this.app);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

new Server();
