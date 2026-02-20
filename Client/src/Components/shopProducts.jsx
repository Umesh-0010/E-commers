import React, { useState, useEffect } from "react";
import axiosClient from "../Services/api.js";

function ShopProduct({ items = [] }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
     if (e.key === "Escape") {
       setSelectedProduct(null);
     }
     };
     if (selectedProduct) {
     document.body.style.overflow = "hidden";
     window.addEventListener("keydown", handleKeyDown);
       } else {
     document.body.style.overflow = "";
     }
     return () => {
     document.body.style.overflow = "";
     window.removeEventListener("keydown", handleKeyDown);
      };
  }, [selectedProduct]);

  
  
  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    try {
      setLoading(true);

      const response = await axiosClient.post("/products/addToCart", {
        product_id: selectedProduct.id,
        quantity: 1 
      });

      console.log("Added:", response.data);
      alert(response.data.message);

      setSelectedProduct(null); 
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add product ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full p-10 grid gap-6 justify-items-center
      grid-cols-[repeat(auto-fill,minmax(224px,1fr))]"
    >
      {items.map((product) => (
        <div
          key={product.id}
          onClick={() => setSelectedProduct(product)}
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

      {/* Modal */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 flex items-center justify-center
          bg-black/40 backdrop-blur-sm z-50 px-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProduct.name}
              </h2>

              <p className="text-gray-600">
                {selectedProduct.description}
              </p>

              <p className="text-xl font-semibold text-green-600">
                ₹{selectedProduct.price}
              </p>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition active:scale-95">
                  Buy Now
                </button>

                
                
                <button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="flex-1 bg-yellow-400 text-gray-800 py-2 rounded-lg 
                  hover:bg-yellow-500 transition active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopProduct;
