import Hero from "../../Components/hero";

export default function Home() {
	return (
		<>
			<section className="h-144 w-screen overflow-hidden flex items-center bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 text-white">
				<div className="max-w-6xl w-full mx-auto grid grid-cols-2 items-center gap-12 px-6">
					{/* Left Content */}
					<div>
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							Everything You Need <br />
							for School & Office
						</h1>

						<p className="text-lg md:text-xl text-gray-200 mb-6">
							Premium stationery products at affordable prices.
						</p>

						<div className="flex gap-4">
							<button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold">
								Shop Now
							</button>

							<button className="border border-white px-8 py-3 rounded-full">
								Explore
							</button>
						</div>
					</div>

					{/* Right Content (Example Image) */}
					
					<Hero/>
				</div>
			</section>
		</>
	);
}