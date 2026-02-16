import pool from '../Database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const adminSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Check if admin already exists
    const { rows } = await pool.query(
      'SELECT id FROM admins WHERE email = $1',
      [email]
    );
    

    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert admin into database
    const result = await pool.query(
      'INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING id, email',
      [name, email, hashedPassword]
    );

    const admin = result.rows[0];

    // 5. Create JWT
    const token = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 6. Set cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // 7. Send response
    res.status(201).json({
      message: 'Admin registered successfully',
      admin,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



////---------------------- login-------------------------------------

export const adminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Check if admin exists
    const result = await pool.query(
      'SELECT id, password FROM admins WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const admin = result.rows[0];

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 4. Create JWT
    const token = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 5. Set cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // 6. Success response
    res.status(200).json({
      message: 'Admin logged in successfully',
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};