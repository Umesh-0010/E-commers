import { Route, Routes } from 'react-router-dom';
import NotFound from './Components/404-page/NotFound.jsx';
import Navbar from './Components/Navbar.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import Cart from './Pages/carts.jsx';
import HomePage from './Pages/homePage.jsx';
import Product from './Pages/Product.jsx';
import SingIn from './Pages/SingIn.jsx';

const App = () => {
	return (
		<>
			<Navbar />

			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/Product"
					element={<Product />}
				/>
				<Route
					path="/Cart"
					element={<Cart />}
				/>
				<Route
					path="/Login"
					element={<SingIn />}
				/>
				<Route
					path="/aboutUs" 
					element={<AboutUs />}
				/>
				<Route
					path="/*"
					element={<NotFound />}
				/>
			</Routes>
		</>
	);
};

export default App;
