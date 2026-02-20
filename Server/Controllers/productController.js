import { pool } from '../Database/database.js';

export const getProduct = async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT * FROM products ORDER BY id ASC',
		);

		res.status(200).json({
			success: true,
			count: result.rowCount,
			products: result.rows,
		});
	} catch (error) {
		console.error('Get Products Error:', error);
		res.status(500).json({ message: 'Server Error' });
	}
};

export const addToCard = async (req, res) => {
	try {
		const user_id = req.user.userId;
		const { product_id } = req.body;

		if (!product_id) {
			return res.status(400).json({ message: 'Product ID is required' });
		}

		const existing = await pool.query(
			'SELECT quantity FROM cart WHERE user_id = $1 AND product_id = $2',
			[user_id, product_id],
		);

		if (existing.rows.length > 0) {
			// If exists → increase quantity
			await pool.query(
				'UPDATE cart SET quantity = quantity + 1 WHERE user_id = $1 AND product_id = $2',
				[user_id, product_id],
			);

			return res.status(200).json({ message: 'Quantity increased' });
		}

		// If not exists → insert new row
		await pool.query(
			'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, 1)',
			[user_id, product_id],
		);

		res.status(201).json({ message: 'Product added to cart' });
	} catch (error) {
		console.error('Cart Error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const getCart = async (req, res) => {
    try {
        const user_id = req.user.userId;

        const query = `
            SELECT 
                p.id AS product_id,
                p.product_name, 
                p.description,
                p.image, 
                c.quantity, 
                p.price, 
                (p.price * c.quantity) AS subtotal
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = $1`;

        const { rows } = await pool.query(query, [user_id]);

        // Calculate total safe from null/undefined
        const totalAmount = rows.reduce(
            (acc, item) => acc + parseFloat(item.subtotal || 0),
            0
        );

        res.status(200).json({
            success: true,
            message: rows.length > 0 ? 'Cart fetched successfully' : 'Your cart is empty',
            cart: rows,
            totalAmount: totalAmount.toFixed(2),
        });
    } catch (error) {
        console.error('Get Cart Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve cart items',
        });
    }
};

