import pool from '../Database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userSignUp = async (req, res) => {
  try {
    const { registration_id, name, email, password } = req.body;

    if (!registration_id || !name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

      const regIdPattern = /^\d{12}$/;
    if (!regIdPattern.test(registration_id)) {
      return res.status(400).json({
        message: 'Registration ID must be exactly 12 digits'
      });
    }

    const msuEmailPattern = /^[a-zA-Z0-9._%+-]+@msu\.edu\.in$/;
    if (!msuEmailPattern.test(email)) {
      return res.status(400).json({
        message: 'Only Valid email addresses are allowed'
      });
    }

    const { rows } = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR registration_id = $2',
      [email, registration_id]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (registration_id, name, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email`,
      [registration_id, name, email, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('user_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ message: 'Signup successful', user });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};




//-----------login---------------------------------

export const userSignIn = async (req, res) => {
  try {
    const {registration_id, email, password } = req.body;

    if (!registration_id || !email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const result = await pool.query(
      'SELECT id, name, email, password FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('user_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};