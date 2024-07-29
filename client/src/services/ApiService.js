import axios from "axios";

class ApiService {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL,
        });

        // Adding an interceptor to include token in headers
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
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
        return this.api.post('/auth/register-admin', data);
    }

    getUserProfile() {
        return this.api.get('/auth/profile');
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

    // Product endpoints
    getProducts() {
        return this.api.get('/products');
    }

    getProductById(id) {
        return this.api.get(`/products/${id}`);
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
}

const apiService = new ApiService(process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
export default apiService;


// import axios from 'axios';
//
// class ApiService {
//     constructor(baseURL) {
//         this.api = axios.create({
//             baseURL,
//         });
//
//         // Adding an interceptor to include token in headers
//         this.api.interceptors.request.use((config) => {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         }, (error) => {
//             return Promise.reject(error);
//         });
//     }
//
//     // Auth endpoints
//     login(data) {
//         return this.api.post('/auth/login', data);
//     }
//
//     register(data) {
//         return this.api.post('/auth/register', data);
//     }
//
//     registerAdmin(data) {
//         return this.api.post('/auth/register-admin', data);
//     }
//
//     getUserProfile() {
//         return this.api.get('/auth/profile');
//     }
//
//     // Admin endpoints
//     getUsers() {
//         return this.api.get('/admin/users');
//     }
//
//     deleteUser(id) {
//         return this.api.delete(`/admin/users/${id}`);
//     }
//
//     addProduct(data) {
//         return this.api.post('/admin/products', data);
//     }
//
//     deleteProduct(id) {
//         return this.api.delete(`/admin/products/${id}`);
//     }
//
//     // Product endpoints
//     getProducts() {
//         return this.api.get('/products');
//     }
//
//     getProductById(id) {
//         return this.api.get(`/products/${id}`);
//     }
// }
//
// const apiService = new ApiService(process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
// export default apiService;
