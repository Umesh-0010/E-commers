import React, { useState, useEffect } from 'react';
import axiosClient from '../Services/api.js';

function Carts({ togglePanel }) {
	const [loading, setLoading] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [error, setError] = useState(null);

	// Fetch cart items from backend
	useEffect(() => {
		const controller = new AbortController();

		const fetchCart = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await axiosClient.get('/products/cart', {
					signal: controller.signal,
				});
				setCartItems(response.data.cart || []);
			} catch (err) {
				if (err.name !== 'CanceledError') {
					setError('Failed to fetch cart');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchCart();

		return () => controller.abort();
	}, []);

	const handleBuy = (product) => {
		alert(`Buying ${product.name} for ${product.price}`);
	};

	const handleRemove = (product) => {
		alert(`Removed ${product.name} from cart`);
	};

	console.log(cartItems);

	return (
		<div className="fixed top-5 right-5 h-[80%] w-1/3 bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 shadow-2xl overflow-auto z-50 p-3 rounded-xl noscroller">
			<div
				className="p-3 bg-[hsl(244,74%,49%)] w-24 flex items-center justify-center rounded-xl cursor-pointer hover:bg-[hsl(244,86%,26%)] transition text-white"
				onClick={() => togglePanel(null)}>
				Close
			</div>
			<h2 className="text-2xl md:text-4xl font-bold mb-4 text-white text-center drop-shadow-lg tracking-tight border-b-blue-700">
				My Cart
			</h2>

			{loading ? (
				<p className="text-white text-center mt-10">Loading cart...</p>
			) : error ? (
				<p className="text-red-200 text-center mt-10">{error}</p>
			) : cartItems.length === 0 ? (
				<p className="text-white text-center mt-10">
					Your cart is empty.
				</p>
			) : (
				<div className="h-98 rounded-xl overflow-scroll noscroller">
					<div className="flex flex-col gap-2">
						{cartItems.map((item) => (
							<div
								key={item.product_id} // Use product_id from your SQL alias
								className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
								<div className="relative h-28 w-28 md:h-32 md:w-32 rounded-xl overflow-hidden border border-white/20 bg-linear-to-tr from-white/5 via-white/10 to-white/5 shadow-inner">
									<img
										// Note: Your current SQL query doesn't select an image column.
										// Ensure 'image_url' is in your SELECT statement if you want real images.
										src={
											item.image || '/images/img1.png'
										}
										alt={item.product_name}
										className="h-full w-full object-contain p-2 rounded-xl"
									/>
								</div>

								<div className="flex flex-col justify-between flex-1 text-white">
									<div>
										<h3 className="font-semibold text-lg md:text-xl tracking-wide">
											{item.product_name}
										</h3>
										<p className="text-gray-300 text-sm md:text-base mt-1">
											{item.description}
										</p>
										<p className="font-bold text-md md:text-lg mt-2">
											${parseFloat(item.price).toFixed(2)}
										</p>
										<p className="text-gray-400 text-sm mt-1">
											Quantity: {item.quantity}
										</p>
										<p className="text-blue-200 text-xs mt-1 italic">
											Subtotal: $
											{parseFloat(item.subtotal).toFixed(
												2,
											)}
										</p>
									</div>

									<div className="flex gap-3 mt-4">
										<button
											onClick={() => handleBuy(item)}
											className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition-colors">
											Buy
										</button>
										<button
											onClick={() => handleRemove(item)}
											className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl transition-colors">
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Carts;
