import React from 'react';

function Carts({ togglePanel }) {
	const products = [
		{
			id: 1,
			name: 'Notebook 1',
			description: 'Premium notebook',
			price: '$29.99',
			image: '/images/img1.png',
		},
		{
			id: 2,
			name: 'Notebook 2',
			description: 'Premium notebook',
			price: '$25.99',
			image: '/images/img1.png',
		},
		{
			id: 3,
			name: 'Notebook 3',
			description: 'Premium notebook',
			price: '$35.99',
			image: '/images/img1.png',
		},
		{
			id: 4,
			name: 'Notebook 4',
			description: 'Premium notebook',
			price: '$19.99',
			image: '/images/img1.png',
		},
		{
			id: 5,
			name: 'Notebook 5',
			description: 'Premium notebook',
			price: '$22.99',
			image: '/images/img1.png',
		},
		{
			id: 6,
			name: 'Notebook 6',
			description: 'Premium notebook',
			price: '$29.99',
			image: '/images/img1.png',
		},
		{
			id: 7,
			name: 'Notebook 7',
			description: 'Premium notebook',
			price: '$32.99',
			image: '/images/img1.png',
		},
		{
			id: 8,
			name: 'Notebook 8',
			description: 'Premium notebook',
			price: '$28.99',
			image: '/images/img1.png',
		},
		{
			id: 9,
			name: 'Notebook 9',
			description: 'Premium notebook',
			price: '$26.99',
			image: '/images/img1.png',
		},
		{
			id: 10,
			name: 'Notebook 10',
			description: 'Premium notebook',
			price: '$30.99',
			image: '/images/img1.png',
		},
		{
			id: 11,
			name: 'Notebook 11',
			description: 'Premium notebook',
			price: '$27.99',
			image: '/images/img1.png',
		},
	];

	const handleBuy = (product) => {
		alert(`Buying ${product.name} for ${product.price}`);
	};

	const handleRemove = (product) => {
		alert(`Removed ${product.name} from cart`);
	};

	return (
		<div className="fixed top-5 right-5 h-[80%] w-1/3  bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 shadow-2xl overflow-auto z-50 p-3  rounded-xl  noscroller">
			<div
				className="p-3 bg-[hsl(244,74%,49%)] w-24 flex items-center justify-center rounded-xl cursor-pointer hover:bg-[hsl(244,86%,26%)] transition text-white"
				onClick={() => togglePanel(null)}>
				Close
			</div>
			<h2 className="text-2xl md:text-4xl font-bold mb-4 text-white text-center drop-shadow-lg tracking-tight border-b-blue-700 ">
				My Cart
			</h2>
			<div className="h-98 rounded-xl overflow-scroll noscroller ">
				<div className="flex flex-col gap-2 ">
					{products.map((product) => (
						<div
							key={product.id}
							className="flex flex-col md:flex-row gap-3 p-4 rounded-xl bg-white/20 backdrop-blur-sm shadow-md   transition-all duration-300 cursor-pointer">
							<img
								src={product.image}
								alt={product.name}
								className="h-24 w-24 object-contain rounded-xl border border-white/30 p-1 bg-white/10"
							/>
							<div className="flex flex-col justify-between text-white flex-1">
								<div>
									<h3 className="font-semibold text-lg md:text-xl">
										{product.name}
									</h3>
									<p className="text-gray-200 text-sm md:text-base">
										{product.description}
									</p>
									<p className="font-bold text-md md:text-lg mt-1">
										{product.price}
									</p>
								</div>

								<div className="flex gap-4 mt-2">
									<button
										onClick={() => handleBuy(product)}
										className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-1 rounded-xl transition-colors">
										Buy
									</button>
									<button
										onClick={() => handleRemove(product)}
										className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 rounded-xl transition-colors">
										Remove
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Carts;
