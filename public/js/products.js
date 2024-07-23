document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    let currentPage = 1;
    const perPage = 10;
    let isLoading = false;

    function fetchProducts(page) {
        isLoading = true;
        fetch(`/fetch-products?page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.data && Array.isArray(data.data)) {
                    appendProductList(data.data);
                    currentPage = page;
                    isLoading = false;
                } else {
                    console.error('Unexpected response format:', data);
                    isLoading = false;
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                isLoading = false;
            });
    }

    function appendProductList(products) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = "p-4 bg-white border rounded shadow-md product-card hover:shadow-lg";
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
                <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
                <p class="text-gray-700 mb-2">${product.description}</p>
                <p class="text-green-500 font-bold">Price: $${product.price}</p>
            `;
            productList.appendChild(productCard);
        });
    }

    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
            fetchProducts(currentPage + 1);
        }
    }

    window.addEventListener('scroll', handleScroll);
    fetchProducts(currentPage);
});
