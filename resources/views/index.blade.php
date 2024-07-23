<x-layouts.default>

	<div class="container flex items-center justify-center mx-auto my-12 prose">
		<h1>
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Products</title>
				@vite('resources/js/app.js')
				@vite('resources/js/products.js')
			</head>
			<body>
				<div class="container px-4 py-8 mx-auto">
					<h1 class="mb-4 text-2xl font-bold">Products</h1>
	
					<div id="product-list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						<!-- Products will be injected here by JavaScript -->
					</div>
				</div>
	
				<!-- Modal Background -->
				<div id="productModal" class="fixed inset-0 flex items-center justify-center hidden bg-black bg-opacity-50">
					<!-- Modal Content -->
					<div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
						<!-- Close Button -->
						<button id="closeModal" class="absolute text-gray-500 top-2 right-2 hover:text-gray-700 focus:outline-none" aria-label="Close Modal" onclick="closeModal()">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</button>
						<!-- Modal Body -->
						<div class="flex flex-col space-y-4">
							<div class="flex items-center">
								<img id="productImage" src="" alt="Product Image" class="object-cover w-32 h-32 rounded-md">
								<div class="ml-4">
									<h2 id="productName" class="text-2xl font-bold"></h2>
									<p id="productDescription" class="mt-1 text-gray-600"></p>
									<p id="productPrice" class="mt-2 text-xl font-semibold text-gray-800"></p>
								</div>
							</div>
							<div>
								<p id="productSize" class="text-gray-700"></p>
								<p id="productQuantity" class="text-gray-700"></p>
								<p id="productStock" class="text-gray-700"></p>
								<p id="productCategory" class="text-gray-700"></p>
								<p id="productBrand" class="text-gray-700"></p>
							</div>
							<input id="productId" type="hidden">
							<div class="flex justify-end">
								<button id="addToCart" class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Add to Cart</button>
							</div>
						</div>
					</div>
				</div>
	
				<script src="{{ asset('js/products.js') }}"></script>
			</body>
			</html>
		</h1>
	</div>
	
	</x-layouts.default>
	