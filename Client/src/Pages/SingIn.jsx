import { useState } from 'react';
import  axiosClient from '../Services/api.js'
import { useNavigate } from 'react-router-dom';



function SignIn({ togglePanel }) {
	const navigate = useNavigate();

	const [page, setPage] = useState('register');
	const [registerData, setRegisterData] = useState({ name: '', phone_number: '', registration_id: '', email: '', password: ''});
	const [loginData, setLoginData] = useState({ registration_id: '', password: '',});
	const [loading, setLoading] = useState(false);
  	const [error, setError] = useState('');

	const handleRegisterChange = (e) => {
		setRegisterData({ ...registerData, [e.target.name]: e.target.value });
	};

	const handleLoginChange = (e) => {
			setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
    	setError('');
    		try {
    			  const response = await axiosClient.post('/user/register', registerData);
    			  alert(response.data.message);
				  togglePanel('null')
    			  navigate('/Product');
				   
    			} catch (err) {
    			  console.error(err);
    			  alert(err.response?.data?.message || 'Registration failed');
    			} finally {
    			  setLoading(false);
    		}
	};

	const handleLoginSubmit = async (e) => {
    	e.preventDefault();
    	setLoading(true);
    	setError('');
    	try {
    		  const response = await axiosClient.post('/user/login', loginData);
    		  alert(`Welcome back, ${response.data.name}`);
			  togglePanel('null')
			  setPage('/Product'); 
    		   
    		} catch (err) {
    		  console.error(err);
    		  alert(err.response?.data?.message || 'Login failed');
    		} finally {
    		  setLoading(false);
    	 }
  		};  




	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 md:p-10">
			<div className="relative w-full max-w-md bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 shadow-2xl rounded-xl overflow-hidden p-6 md:p-8">

				<div
					className="p-2 bg-[hsl(244,74%,49%)] w-24 flex items-center justify-center rounded-xl cursor-pointer hover:bg-[hsl(244,86%,26%)] transition text-white"
					onClick={() => togglePanel(null)}>
					Close
				</div>

				<h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center drop-shadow-lg">
					{page === 'register' ? 'Sign-In' : 'Login'}
				</h2>

				{page === 'register' && (
					<form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">

						<input
							type="text"
							name="name"  
							placeholder="Full Name"
							required
							value={registerData.name}
							onChange={handleRegisterChange}
							className="p-2 border rounded outline-none border-gray-300 text-white"
						/>

						<input
							type="tel"
							name="phone_number"
							placeholder="Phone Number"
							required
							value={registerData.phone_number}
							onChange={handleRegisterChange}
							className="p-2 border rounded outline-none border-gray-300 text-white"
						/>

						<input
							type="text"
							name="registration_id"
							placeholder="Registration ID"
							required
							value={registerData.registration_id}
							onChange={handleRegisterChange}
							className="p-2 border rounded outline-none border-gray-300 text-white"
						/>

						<input
							type="email"
							name="email"
							placeholder="Email Address"
							required
							value={registerData.email}
							onChange={handleRegisterChange}
							className="p-2 border rounded outline-none border-gray-300 text-white"
						/>

						<input
							type="password"  
							name="password"
							placeholder="Password"
							required
							value={registerData.password}
							onChange={handleRegisterChange}
							className="p-2 border rounded outline-none border-gray-300 text-white"
						/>

						<button
							type="submit"
							className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition-colors">
							Sign-In
						</button>

						<p
							className="text-sm text-blue-200 mt-4 cursor-pointer text-center hover:underline"
							onClick={() => setPage('login')}>
							Already have an account?
						</p>

					</form>
				)}

				{page === 'login' && (
					<form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">

						<input
							type="text"
							name="registration_id"
							placeholder="Registration ID"
							required
							value={loginData.registration_id}
							onChange={handleLoginChange}
							className="p-2 border rounded outline-none border-gray-300 text-white"
						/>

						<input
							type="password"
							name="password"
							placeholder="Password"
							required
							value={loginData.password}
							onChange={handleLoginChange}
							className="p-2 border rounded outline-none border-gray-300 text-white"
						/>

						<button
							type="submit"
							className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition-colors">
							Login
						</button>

						<p
							className="text-sm text-blue-200 mt-4 cursor-pointer text-center hover:underline"
							onClick={() => setPage('register')}>
							Don’t have an account?
						</p>

					</form>
				)}
			</div>
		</div>
	);
}

export default SignIn;