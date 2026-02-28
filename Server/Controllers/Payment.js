import { pool } from '../Database/database.js';

export const createOrder = async (req, res) => {


	const data = await pool.query(
		'SELECT * FROM users WHERE userid = $1 AND productid = $2',
		[userid, productid],
	);

    
};
