import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShopProducts from "../Components/shopProducts";
import axiosClient from "../Services/api";

function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/products");
        setProducts(res.data.products);
      } catch (error) {
        if (error.response?.status === 401) {
			navigate("/");
          	alert("Please login first");          
        } else {
          alert("Something went wrong");
          console.error(error);
        }
      }
    };

    fetchProducts();
  }, [navigate]);

  return (
    <div className="h-144 w-full bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 overflow-scroll noscroller">
      <ShopProducts products={products} />
    </div>
  );
}

export default Product;
