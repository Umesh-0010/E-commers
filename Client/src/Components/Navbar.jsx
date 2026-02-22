import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Carts from '../Pages/carts';
import SignIn from '../Pages/SingIn';

function Navbar() {
	const [openPanel, setOpenPanel] = useState(null);

	const togglePanel = (panel) => {
		setOpenPanel(openPanel === panel ? null : panel);
	};

	return (
		<div className="relative">
			<div className="flex items-center justify-between bg-white px-8 py-4 shadow-md text-blue-500">
				<div className="text-2xl font-bold text-blue-700">
					E-commerce
				</div>

				<div className="flex items-center gap-8 text-base font-medium">
					<NavLink
						to="/"
						className="hover:text-blue-600 transition">
						<div className="flex items-end gap-2">
							<span>Home</span>
						</div>
					</NavLink>

					<NavLink
						to="/Product"
						className="hover:text-blue-600 transition">
						<div className="flex items-end gap-2">
							<span>Product</span>
						</div>
					</NavLink>

					<div
						className="flex items-end gap-2 hover:text-blue-600 transition cursor-pointer relative"
						onClick={() => togglePanel('cart')}>
						<span>Cart</span>
					</div>
					{openPanel === 'cart' && <Carts togglePanel={togglePanel} />}

					<div
						className="relative flex items-end gap-2 hover:text-blue-600 cursor-pointer"
						onClick={() => togglePanel('login')}>
						<span>Sing In</span>
					</div>
					{openPanel === 'login' && <SignIn togglePanel={togglePanel} />}

					<NavLink
						to="/aboutUs"
						className="hover:text-blue-600 transition">
						<div className="flex items-end gap-2">
							<span>About Us</span>
						</div>
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
