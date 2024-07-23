$(document).ready(function() {
    // Initialize Algolia client
    const algoliasearch = window.algoliasearch;
    if (!algoliasearch) {
        console.error('Algolia JavaScript client not loaded. Check your script tag.');
        return;
    }

    const client = algoliasearch('YN09VO8F48', '7559e3ff7dbd918fde0136620cfc848e');
    const index = client.initIndex('products');

    const searchInput = document.getElementById('searchInput');
    const suggestionBox = document.getElementById('suggestionBox');
    let searchQuery = '';
    let isSearching = false;

    // Handle search input changes
    searchInput.addEventListener('input', async () => {
        searchQuery = searchInput.value;
        isSearching = searchQuery.length > 0;

        if (isSearching) {
            try {
                const { hits } = await index.search(searchQuery);

                // Update suggestions list
                suggestionBox.innerHTML = hits.map(hit => `
                    <li data-id="${hit.id}" class="p-2 cursor-pointer hover:bg-gray-100 flex items-center">
                        <img src="${hit.image}" alt="${hit.name}" class="w-12 h-12 mr-2 rounded object-cover">
                        <div>
                            <div class="font-semibold">${hit.name}</div>
                            <div class="hidden product-details" 
                                data-product-id="${hit.id}" 
                                data-product-name="${hit.name}" 
                                data-product-description="${hit.description}" 
                                data-product-price="${hit.price.toFixed(2)}"
                                data-product-image="${hit.image}"
                                data-product-size="${hit.size}"
                                data-product-quantity="${hit.quantity}"
                                data-product-stock="${hit.stock}"
                                data-product-category-id="${hit.category_id}"
                                data-product-brand-id="${hit.brand_id}">
                            </div>
                        </div>
                    </li>
                `).join('');                
                suggestionBox.classList.remove('hidden');
            } catch (error) {
                console.error('Error fetching search results:', error);
                suggestionBox.innerHTML = '<li class="p-2 text-red-500">Error fetching results</li>';
                suggestionBox.classList.remove('hidden');
            }
        } else {
            suggestionBox.innerHTML = '';
            suggestionBox.classList.add('hidden');
        }
    });

    // Handle suggestion box item selection
    suggestionBox.addEventListener('click', (event) => {
        const target = event.target.closest('li[data-id]');
        if (target) {
            const productId = target.getAttribute('data-id');
            const productName = target.querySelector('.product-details').getAttribute('data-product-name');
            const productDescription = target.querySelector('.product-details').getAttribute('data-product-description');
            const productPrice = `₱${target.querySelector('.product-details').getAttribute('data-product-price')}`;
            const productImage = target.querySelector('.product-details').getAttribute('data-product-image');
            const productSize = target.querySelector('.product-details').getAttribute('data-product-size');
            const productQuantity = target.querySelector('.product-details').getAttribute('data-product-quantity');
            const productStock = target.querySelector('.product-details').getAttribute('data-product-stock');
            const productCategoryId = target.querySelector('.product-details').getAttribute('data-product-category-id');
            const productBrandId = target.querySelector('.product-details').getAttribute('data-product-brand-id');
    
            openModal(productId, productName, productDescription, productPrice, productImage, productSize, productQuantity, productStock, productCategoryId, productBrandId);
    
            searchInput.value = productName;
            suggestionBox.innerHTML = '';
            suggestionBox.classList.add('hidden');
            isSearching = true;
        }
    });
    

    // Hide suggestion box when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !suggestionBox.contains(event.target)) {
            suggestionBox.innerHTML = '';
            suggestionBox.classList.add('hidden');
        }
    });

    // Handle clear search button click
    const clearSearchButton = document.getElementById('clearSearch');
    if (clearSearchButton) {
        clearSearchButton.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            suggestionBox.innerHTML = '';
            suggestionBox.classList.add('hidden');
            isSearching = false;
        });
    }

    // Modal functions
window.openModal = function(productId, productName, productDescription, productPrice, productImage, productSize, productQuantity, productStock, productCategoryId, productBrandId) {
    $('#productName').text(productName);
    $('#productDescription').text(productDescription);
    $('#productPrice').html(productPrice);
    $('#productImage').attr('src', productImage);
    $('#productSize').text(`Size: ${productSize}`);
    $('#productQuantity').text(`Quantity: ${productQuantity}`);
    $('#productStock').text(`Stock: ${productStock}`);
    $('#productCategory').text(`Category ID: ${productCategoryId}`);
    $('#productBrand').text(`Brand ID: ${productBrandId}`);
    $('#productId').val(productId); // Changed to val() for an input field
    $('#productModal').removeClass('hidden');

    window.closeModal = function() {
        // Hide the modal
        document.getElementById('productModal').classList.add('hidden');
        
        // Optionally, reset form fields or content if needed
        $('#productName').text('');
        $('#productPrice').html('');
        $('#productImage').attr('src', '');
        $('#productStocks').text('');
        $('#productCategory').text('');
        $('#Quantity').val(1); // Reset quantity to default value
    };
    
};

  

  

window.closeModal = function() {
    // Hide the modal
    document.getElementById('productModal').classList.add('hidden');
    
    // Optionally, reset form fields or content if needed
    $('#productName').text('');
    $('#productPrice').html('');
    $('#productImage').attr('src', '');
    $('#productStocks').text('');
    $('#productCategory').text('');
    $('#Quantity').val(1); // Reset quantity to default value
};


   
});
