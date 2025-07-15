let token = '';
let userRole = '';
let apiUrl = 'http://localhost:5000';

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        token = data.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        userRole = payload.role;
        alert("Login successful as " + userRole);
        loadProducts();
    })
    .catch(err => alert("Login failed"));
}

function loadProducts() {
    const query = document.getElementById("searchInput").value;

    fetch(`${apiUrl}/api/products?search=${query}`)
        .then(res => res.json())
        .then(data => {
            const productsDiv = document.getElementById("products");
            productsDiv.innerHTML = `
                <h3>Products</h3>
                <table border="1">
                    <tr>
                        <th>Name</th><th>Category</th><th>Price</th><th>Description</th><th>Stock</th><th>Action</th>
                    </tr>
                    ${data.map(p => `
                        <tr>
                            <td>${p.name}</td>
                            <td>${p.category}</td>
                            <td>₹${p.price}</td>
                            <td>${p.description}</td>
                            <td>${p.stock}</td>
                            <td>
                                ${userRole === 'customer' ? `<button onclick="addToCart('${p._id}')">Add to Cart</button>` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </table>
            `;
        });
}

function addToCart(productId) {
    if (!token) return alert("Please login as customer");

    fetch(`${apiUrl}/api/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 1 })
    })
    .then(res => res.json())
    .then(data => alert("Added to cart"))
    .catch(err => alert("Error adding to cart"));
}

function placeOrder() {
    if (!token) return alert("Login required");

    fetch(`${apiUrl}/api/order`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => alert("Order placed successfully"))
    .catch(err => alert("Order failed"));
}
