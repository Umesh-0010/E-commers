import React, { useState } from "react";

function ShopProducts() {
  const [expanded, setExpanded] = useState(null);

  const products = [
    { img: "/images/img1.png", name: "Product 1", price: "$49.99" },
    { img: "/images/img1.png", name: "Product 2", price: "$59.99" },
    { img: "/images/img1.png", name: "Product 3", price: "$39.99" },
    { img: "/images/img1.png", name: "Product 4", price: "$29.99" },
    { img: "/images/img1.png", name: "Product 5", price: "$19.99" },
    
  ];

  return (
    <div className="h-full w-full overflow-y-auto flex flex-wrap p-10 gap-6 justify-center items-start">
      {products.map((product, index) => (
        <div
          key={index}
          onClick={() => setExpanded(expanded === index ? null : index)}
          className={`cursor-pointer shrink-0 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300
            ${expanded === index ? "w-64 h-101 border-2 border-amber-200 z-50 relative" : "w-54 h-60 bg-amber-100 relative z-0"}
          `}
        >
          <img
            src={product.img}
            alt={product.name}
            className={`object-cover w-full transition-all duration-300 ${
              expanded === index ? "h-2/3" : "h-full"
            }`}
          />
          {expanded === index && (
            <div className="px-3 py-3 flex flex-col gap-3 bg-white h-1/3">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                  Buy Now
                </button>
                <button className="flex-1 bg-yellow-400 text-gray-800 py-2 rounded-md hover:bg-yellow-500 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShopProducts;