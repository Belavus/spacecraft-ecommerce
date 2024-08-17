import axios from "axios";

class ApiService {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL,
        });

        // Adding an interceptor to include token in headers
        this.api.interceptors.request.use((config) => {
            let token = localStorage.getItem('token');
            if (!token) { token = sessionStorage.getItem('token')};
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    // Auth endpoints
    login(data) {
        return this.api.post('/auth/login', data);
    }

    register(data) {
        return this.api.post('/auth/register', data);
    }

    registerAdmin(data) {
        return this.api.post('/admin/register', data);
    }

    getUserProfile() {
        return this.api.get('/auth/profile');
    }

    changeUserPassword(currentPassword, newPassword) {
        return this.api.put('/auth/change-password', { currentPassword, newPassword });
    }

    // Admin endpoints
    getUsers() {
        return this.api.get('/admin/users');
    }

    deleteUser(id) {
        return this.api.delete(`/admin/users/${id}`);
    }

    addProduct(data) {
        return this.api.post('/admin/products', data);
    }

    deleteProduct(id) {
        return this.api.delete(`/admin/products/${id}`);
    }

    updateProduct(id, data) {
        return this.api.put(`/admin/products/${id}`, data);
    }

    // Product endpoints
    getProducts() {
        return this.api.get('/products');
    }

    getProductById(id) {
        return this.api.get(`/products/${id}`);
    }

    getUniqueProductValues() {  // New method
        return this.api.get('/products/unique/values');
    }

    updateProductRating(id, rating) {
        return this.api.put(`/products/${id}/rating`, { rating });
    }

    // Cart endpoints
    addToCart(data) {
        return this.api.post('/cart', data);
    }

    getCart() {
        return this.api.get('/cart');
    }

    updateCart(data) {
        return this.api.put('/cart', data);
    }

    deleteCartItem(id) {
        return this.api.delete(`/cart/${id}`);
    }

    // Order endpoints
    placeOrder() {
        return this.api.post('/order');
    }

    getOrders() {
        return this.api.get('/order');
    }

    // HomePage endpoints
    getHomePageInfo() {
        return this.api.get('/homepage');
    }

    updateHomePageInfo(data) {
        return this.api.put('/homepage', data);
    }

}

const apiService = new ApiService(process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
export default apiService;
