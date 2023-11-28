import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface CartContextType {
    cartCount: number;
    setCartCount: Dispatch<SetStateAction<number>>;
}

const CartContext = createContext < CartContextType | undefined > (undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartCount, setCartCount] = useState < number > (0);

    const value: CartContextType = {
        cartCount,
        setCartCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
