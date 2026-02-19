import React, { useState, useEffect } from "react";
import axiosClient from '../Services/api.js'

function ShopProducts({products}) {
  const [expanded, setExpanded] = useState(null);

  const handleAddToCart = async () => {
  if (expanded === null) return;

  const product = products.id;
   console.log(productId)

  try {
    const response = await axiosClient.post("/products/addToCart",
     
      {
        productId: product.id,
        
        
        quantity: 1,
      }
    );

    console.log("Success:", response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data || error.message
    );
  }
};



 
  useEffect(() => {
    if (expanded !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expanded]);

  return (
    <div
      className="min-h-screen w-full p-10 grid gap-6 justify-items-center
      grid-cols-[repeat(auto-fill,minmax(224px,1fr))]"
    >
      
      {products.map((product, index) => (
        <div
          key={index}
          onClick={() => setExpanded(index)}
          className="cursor-pointer rounded-2xl shadow-xl overflow-hidden
          bg-amber-100 w-56 h-60 hover:scale-105
          transition-all duration-300"
        >
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

     
      {expanded !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center
          bg-black/40 backdrop-blur-sm z-50 px-4"
          onClick={() => setExpanded(null)} // click anywhere to close
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Image Section */}
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              <img
                src={products[expanded].image}
                alt={products[expanded].name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {products[expanded].product_name}
              </h2>

              <p className="text-gray-600">
                {products[expanded].description}
              </p>

              <p className="text-xl font-semibold text-green-600">
                {products[expanded].price}
              </p>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                  Buy Now
                </button>

                <button
                onClick={()=>{
                  handleAddToCart()
                }}
                 className="flex-1 bg-yellow-400 text-gray-800 py-2 rounded-lg hover:bg-yellow-500 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopProducts;