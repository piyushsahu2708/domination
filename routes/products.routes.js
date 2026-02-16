const express = require("express");
const upload = require("../config/multer.config");
const authMiddleware = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

const router = express.Router();

router.use(authMiddleware.isAuthenticated)
      .use(authMiddleware.isSeller);

router.post(
    "/create-product",
    upload.array("images", 5),
    productController.createProduct
);

module.exports = router;
