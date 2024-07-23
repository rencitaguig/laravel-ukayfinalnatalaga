<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products</title>
    @vite('resources/js/app.js')
    @vite('resources/js/product.js')
    <style>
        .product-card {
            transition: transform 0.2s ease;
        }
        .product-card:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="container px-4 py-8 mx-auto">
        <h1 class="mb-4 text-2xl font-bold">Products</h1>

        <div id="product-list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <!-- Products will be injected here by JavaScript -->
        </div>

        <div id="pagination" class="flex justify-center mt-4">
            <!-- Pagination links will be injected here by JavaScript -->
        </div>
    </div>

    <script src="{{ asset('js/products.js') }}"></script>
</body>
</html>
