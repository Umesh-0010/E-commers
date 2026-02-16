import { NavLink } from "react-router-dom";


function Navbar() {
  return (
    <div className="flex items-center justify-between bg-white px-8 py-4 shadow-md">

    
      <div className="text-2xl font-bold text-blue-700">
        E-commerce
      </div>

     
      <div className="flex items-center gap-8 text-base font-medium">

        <NavLink to="/" className="hover:text-blue-600 transition">
          <div className="flex items-end gap-2">
            
            <span>Home</span>
          </div>
        </NavLink>

        <NavLink to="/Product" className="hover:text-blue-600 transition">
          <div className="flex items-end gap-2">
            
            <span>Product</span>
          </div>
        </NavLink>

        <NavLink to="/Cart" className="hover:text-blue-600 transition">
          <div className="flex items-end gap-2">
           
            <span>Cart</span>
          </div>
        </NavLink>

        <NavLink to="/Login" className="hover:text-blue-600 transition">
          <div className="flex items-end gap-2">
          
            <span>Login</span>
          </div>
        </NavLink>

        <NavLink to="/aboutUs" className="hover:text-blue-600 transition">
          <div className="flex items-end gap-2">
            
            <span>About Us</span>
          </div>
        </NavLink>

      </div>
    </div>
  );
}

export default Navbar;