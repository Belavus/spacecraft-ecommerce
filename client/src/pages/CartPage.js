import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const CartPage = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    return (
        <div>
            <h1>Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item._id}>
                            {item.name}
                            <button onClick={() => removeFromCart(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;