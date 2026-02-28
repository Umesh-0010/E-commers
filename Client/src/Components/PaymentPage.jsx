import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
	const location = useLocation();
	const data = location.state;
	console.log(data);
	
	

	const [quantity, setQuantity] = useState(1);

	const subtotal = data.product.price * quantity;
	const discountAmount = (subtotal * 30) / 100;
	const total = subtotal - discountAmount;

	return (
		<>
			<div>
				<div className="h-16 w-full mt-2">
					<h1 className="flex items-end mt-5 text-5xl tracking-tighter font-extrabold text-white pl-3">
						Hello {data.userName}
					</h1>
				</div>

				<div className="grid grid-cols-[30%_70%] h-96 gap-3 p-2">
					<div className="h-109.5 w-full rounded-3xl overflow-hidden">
						<img
							src={data.product.image}
							alt={data.product.product_name}
							className="w-full h-full object-fill"
						/>
					</div>

					<div className="bg-white rounded-3xl h-109.5 ">
						<div className="p-6 ">
							<p className="text-lg font-semibold mt-2">{data.product.product_name}</p>
							<div className="flex items-center space-x-2 text-sm">
								
								
								<div className="text-yellow-500">★★★★☆</div>
								<span className="text-gray-600">
									4.8 (120 reviews)
								</span>
							</div>

							
							<p className="text-gray-600 text-sm leading-relaxed">
								{data.product.description}
							</p>

							<div className="text-sm text-gray-700 space-y-1 mt-2">
								<p>
									<span className="font-medium">Category:</span>{' '}
									Premium Service
								</p>
								<p>
									<span className="font-medium">Availability:</span>
									<span className="text-green-600 ml-1">
										in Stuck
									</span>
								</p>
								<p>
									<span className="font-medium">Delivery:</span>{' '}
									Free Delivery in 2–3 days
								</p>
							</div>

							<div className="pt-3 border-t space-y-2">
								<div className="flex justify-between">
									<span>Price:</span>
									<span className="font-semibold">${data.product.price}</span>
								</div>

								<div className="flex justify-between">
									<span>Quantity:</span>
									<span>{quantity}</span>
								</div>

								<div className="flex justify-between">
									<span>Subtotal:</span>
									<span>${subtotal}</span>
								</div>

								<div className="flex justify-between text-red-500">
									<span>Discount (10%):</span>
									<span>- ${discountAmount}</span>
								</div>

								<div className="flex justify-between font-bold text-lg border-t pt-2">
									<span>Total:</span>
									<span>${total}</span>
								</div>
							</div>

							<button className="w-2/4 mt-4 bg-black text-white py-3 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition transform">
								Buy Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;