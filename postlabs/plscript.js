// Product data structure
async function fetchProductDetails() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
                { id: 2, name: "Headphones", price: 149.99, category: "Electronics" },
                { id: 3, name: "Coffee Maker", price: 79.99, category: "Appliances" },
                { id: 4, name: "Running Shoes", price: 89.99, category: "Sports" },
                { id: 5, name: "Backpack", price: 49.99, category: "Accessories" }
            ]);
        }, 1000);
    });
}

async function fetchProductReviews() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate a failure scenario 20% of the time
            if (Math.random() < 0.2) {
                reject(new Error("Failed to fetch reviews"));
                return;
            }
            resolve({
                1: [{ rating: 4.5, comment: "Great laptop!" }],
                2: [{ rating: 4.0, comment: "Good sound quality" }],
                3: [{ rating: 3.5, comment: "Decent coffee maker" }],
                4: [{ rating: 5.0, comment: "Perfect fit!" }],
                5: [{ rating: 4.2, comment: "Durable backpack" }]
            });
        }, 1500);
    });
}

function displayProducts(products, reviews) {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '';
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-container';
        const productReviews = reviews ? reviews[product.id] : null;
        
        let reviewsHtml = '<p><strong>Reviews:</strong> No reviews available</p>';
        if (productReviews) {
            reviewsHtml = productReviews.map(review => `
                <p><strong>Rating:</strong> ${review.rating}</p>
                <p><strong>Comment:</strong> ${review.comment}</p>
            `).join('');
        }

        productDiv.innerHTML = `
            <p><strong>ID:</strong> ${product.id}</p>
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            ${reviewsHtml}
        `;
        productListDiv.appendChild(productDiv);
    });
}

async function loadProductData() {
    try {
        // Fetch both products and reviews in parallel
        const [products, reviews] = await Promise.allSettled([
            fetchProductDetails(),
            fetchProductReviews()
        ]);

        if (products.status === 'rejected') {
            throw new Error('Failed to fetch product details');
        }

        // Display products with reviews if available
        displayProducts(
            products.value,
            reviews.status === 'fulfilled' ? reviews.value : null
        );

        if (reviews.status === 'rejected') {
            const productListDiv = document.getElementById('productList');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.textContent = 'Note: Reviews could not be loaded';
            productListDiv.insertBefore(errorDiv, productListDiv.firstChild);
        }
    } catch (error) {
        const productListDiv = document.getElementById('productList');
        productListDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

function filterProducts() {
    loadProductData();
}

// Initial display of all products
loadProductData();