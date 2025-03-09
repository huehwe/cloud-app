import { createContext, useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const CartContext = createContext(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const toast = useToast();

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item._id === product._id);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(items => items.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(items =>
            items.map(item =>
                item._id === productId
                    ? { ...item, quantity: parseInt(quantity) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const cartTotal = cartItems.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0
    );

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );

};