declare module '../context/CartContext' {
    export const useCart: () => {
      cartCount: number;
      setCartCount: React.Dispatch<React.SetStateAction<number>>;
    };
    // Add other named exports if necessary
  }
  