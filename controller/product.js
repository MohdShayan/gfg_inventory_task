import PRODUCT from "../schema/product.js";

export const handleProductCreation = async (req, res) => {
  const { name, description, price, imgURL } = req.body;

  if (!name || !description || !price || !imgURL) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await PRODUCT.create({ name, description, price, imgURL });
    return res.status(201).json({ success: true, message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await PRODUCT.find({});
        return res.status(200).json({ success: true, products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    try {
        const product = await PRODUCT.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
