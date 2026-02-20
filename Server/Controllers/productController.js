import { pool } from "../Database/database.js";

export const getProduct =  async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");

    res.status(200).json({
      success: true,
      count: result.rowCount,
      products: result.rows,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addToCard = async (req, res) => {
  console.log("REQ.USER:", req.user);
  try {
    const user_id = req.user.userId;   
    const { product_id } = req.body;    

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check if product already exists in cart
    const existing = await pool.query(
      "SELECT quantity FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    if (existing.rows.length > 0) {
      // If exists → increase quantity
      await pool.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id = $1 AND product_id = $2",
        [user_id, product_id]
      );

      return res.status(200).json({ message: "Quantity increased" });
    }

    // If not exists → insert new row
    await pool.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, 1)",
      [user_id, product_id]
    );

    res.status(201).json({ message: "Product added to cart" });

  } catch (error) {
    console.error("Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

