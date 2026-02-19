import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../Database/database.js";

export const registerUser = async (req, res) => {
  try {
    const { name, phone_number, registration_id, email, password } = req.body;

    if (!name || !phone_number || !registration_id || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE registration_id = $1 OR email = $2",
      [registration_id, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already registered Go to login ",
      });
    }

   
    const hashedpassword = await bcrypt.hash(password, 10);

    
    const newUser = await pool.query(
      `INSERT INTO users 
       (name, phone_number, registration_id, email, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [name, phone_number, registration_id, email, hashedpassword]
    );

    const user = newUser.rows[0];

    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { registration_id, password } = req.body;
   
    if (!registration_id || !password) {
      return res.status(400).json({
        message: "Registration ID and Password are required",
      });
    }
 
    const findingUser = await pool.query(
      "SELECT * FROM users WHERE registration_id = $1",
      [registration_id]
    );
   
    if (findingUser.rows.length === 0) {
      return res.status(400).json({
        message: "User not found. Please register first.",
      });
    }

    const user = findingUser.rows[0];
   
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
  
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};