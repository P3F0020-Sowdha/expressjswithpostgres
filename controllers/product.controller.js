exports.getAllProducts = async (req, res) => {
  try {
    const client = await req.db.connect();
    const result = await client.query("SELECT * FROM products");
    const data = result.rows;
    // console.log("Data retrieved successfully:", data);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
exports.getAllProductsById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const client = await req.db.connect();

    // Check if the product with the given ID exists
    const result = await client.query("SELECT * FROM products WHERE product_id = $1", [productId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    const product = result.rows[0];
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
exports.createAllProducts = async (req, res) => {
  try {
    const { product_id, product_name, price, quantity } = req.body;

    if (!product_id || !product_name || !price || !quantity) {
      return res.status(400).json({ success: false, error: "Product ID, name, price, and quantity are required" });
    }

    const client = await req.db.connect();
    const result = await client.query(
      "INSERT INTO products (product_id, product_name, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
      [product_id, product_name, price, quantity]
    );
    const createdProduct = result.rows[0];

    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal Server Error1" });
  }
};
exports.updateProductsById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { product_name, price, quantity } = req.body;

    if (!product_name || !price || !quantity) {
      return res.status(400).json({ success: false, error: " name, price, and quantity are required" });
    }

    const client = await req.db.connect();

    // Check if the product with the given ID exists
    const checkProductExists = await client.query("SELECT * FROM products WHERE product_id = $1", [productId]);

    if (checkProductExists.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    // Update the product
    const result = await client.query(
      "UPDATE products SET product_name = $2, price = $3, quantity = $4 WHERE product_id = $1 RETURNING *",
      [productId, product_name, price, quantity]
    );

    const updatedProduct = result.rows[0];

    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
exports.deleteProductsById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const client = await req.db.connect();

    // Check if the product with the given ID exists
    const checkProductExists = await client.query("SELECT * FROM products WHERE product_id = $1", [productId]);

    if (checkProductExists.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    // Delete the product
    await client.query("DELETE FROM products WHERE product_id = $1", [productId]);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
