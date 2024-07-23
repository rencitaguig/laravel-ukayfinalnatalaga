document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const pagination = document.getElementById('pagination');

    let currentPage = 1;
    const perPage = 10;

    function fetchProducts(page) {
        fetch(`/fetch-products?page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.data && Array.isArray(data.data)) {
                    updateProductList(data.data);
                    updatePagination(data);
                    currentPage = page;
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function updateProductList(products) {
        productList.innerHTML = products.map(product => `
            <div class="product-card p-4 border rounded shadow-md bg-white hover:shadow-lg">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
                <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
                <p class="text-gray-700 mb-2">${product.description}</p>
                <p class="text-green-500 font-bold">Price: $${product.price}</p>
            </div>
        `).join('');
    }

    function updatePagination(data) {
        const lastPage = data.last_page;
        const paginationLinks = [];

        if (data.current_page > 1) {
            paginationLinks.push(`<a href="#" data-page="${data.current_page - 1}" class="pagination-link px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">Previous</a>`);
        }

        for (let i = 1; i <= lastPage; i++) {
            paginationLinks.push(`<a href="#" data-page="${i}" class="pagination-link px-4 py-2 border border-gray-300 rounded-lg ${i === data.current_page ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}">${i}</a>`);
        }

        if (data.current_page < lastPage) {
            paginationLinks.push(`<a href="#" data-page="${data.current_page + 1}" class="pagination-link px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">Next</a>`);
        }

        pagination.innerHTML = paginationLinks.join('');

        document.querySelectorAll('.pagination-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(link.getAttribute('data-page'));
                fetchProducts(page);
            });
        });
    }

    fetchProducts(currentPage);
});
