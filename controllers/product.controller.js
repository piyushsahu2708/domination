const productModel = require("../models/product.model");

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Cloudinary image URLs
        const images = req.files.map(file => file.path);

        const product = await productModel.create({
            name,
            description,
            price,
            images,
            seller: req.user._id
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
};
