import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from '../context/CartContext.jsx';
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";


const CartPage: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const { setCartCount } = useCart();
  const [isCartEmpty, setIsCartEmpty] = useState(true); // State to track if cart is empty
  const navigate = useNavigate();


  useEffect(() => {
    const userId = localStorage.getItem('userId');

    axios.get(`https://ecomserver-8wfu.onrender.com/user-cart/${userId}`)
      .then((response) => {
        setCartProducts(response.data);
        setIsCartEmpty(response.data.length === 0); // Update isCartEmpty state
      })
      .catch((error) => {
        console.error('Error fetching user cart:', error);
      });
  }, []);

  const incrementQuantity = (productId: any) => {
    const updatedCartProducts = cartProducts.map((product: any) => {
      if (product.productId === productId) {
        setCartCount((prevCount: any) => prevCount + 1); // Increment cart count
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    setCartProducts(updatedCartProducts);
    updateQuantityInBackend(productId, 'increment');
  };

  const decrementQuantity = (productId: any) => {
    const updatedCartProducts = cartProducts.map((product: any) => {
      if (product.productId === productId && product.quantity > 1) {
        setCartCount((prevCount: any) => prevCount - 1); // Decrement cart count
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    setCartProducts(updatedCartProducts);
    updateQuantityInBackend(productId, 'decrement');
  };

  const updateQuantityInBackend = (productId: any, action: any) => {
    const userId = localStorage.getItem('userId');

    axios.put(`https://ecomserver-8wfu.onrender.com/update-cart-quantity`, {
      userId,
      productId,
      action,
    })
      .then((response) => {
        console.log('Quantity updated in backend:', response.data);
      })
      .catch((error) => {
        console.error('Error updating quantity in backend:', error);
      });
  };

  const deleteItem = (productId: any) => {
    const deletedProduct = cartProducts.find(
      (product: any) => product.productId === productId
    );

    if (deletedProduct) {
      const updatedCartProducts = cartProducts.filter(
        (product: any) => product.productId !== productId
      );

      setCartProducts(updatedCartProducts);
      deleteItemFromBackend(productId);
      setCartCount((prevCount: any) => Math.max(prevCount - deletedProduct.quantity, 0)); // Decrement cart count by the quantity of the deleted item
    }
  };

  const deleteItemFromBackend = (productId: any) => {
    const userId = localStorage.getItem('userId');

    axios.delete(`https://ecomserver-8wfu.onrender.com/remove-from-cart/${userId}/${productId}`)
      .then((response) => {
        console.log('Item removed from backend:', response.data);
      })
      .catch((error) => {
        console.error('Error removing item from backend:', error);
      });
  };


  const handleCheckout = () => {
    const checkoutData = cartProducts.map((product: any) => {
      return {
        name: product.productDetails.name,
        price: product.productDetails.offerPrice,
        imgurl: product.productDetails.src,
        quantity: product.quantity,
        productId: product.productId,
      };
    });

    navigate('/checkout', { state: { cartItems: checkoutData } });
  };







  return (
    <div className="text-black max-w-md mx-auto bg-white dark:bg-gray-200 p-4 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {isCartEmpty ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartProducts.map((product: any) => (
            <div key={product.productId} className="flex items-center mb-4">
              <div className="flex-shrink-0 h-16 w-20 bg-gray-300 rounded-md">
                <img src={product.productDetails.src} alt={product.productDetails.name} className="h-full w-full object-fit rounded-md" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium">{product.productDetails.name}</h2>
                <p className="text-gray-500">{product.productDetails.offerPrice}</p>
              </div>
              <div className="ml-auto flex items-center">
                <button className="text-gray-100 rounded-full px-2 py-1 bg-gray-500" onClick={() => decrementQuantity(product.productId)}>-</button>
                <span className="mx-2">{product.quantity}</span>
                <button className="text-gray-100 rounded-full px-2 py-1 bg-gray-500" onClick={() => incrementQuantity(product.productId)}>+</button>
              </div>
              <div className="ml-auto flex items-center">
                <span className="mx-4">{Math.round(product.quantity * product.productDetails.offerPrice)}</span>
                <button onClick={() => deleteItem(product.productId)} className="text-red-500"><FaTrash /></button>
              </div>
            </div>
          ))}

          {/* Total price */}
          <div className="flex justify-between mt-4">
            <div className="text-gray-500">Total Price</div>
            <div className="font-medium">{Math.round(cartProducts.reduce((total, product: any) => total + product.quantity * product.productDetails.offerPrice, 0))}</div>

          </div>
          <div className="flex justify-center">
            <button onClick={handleCheckout} className="btn mt-2 w-36">Checkout</button>
          </div>

          {/* End of Total price */}
        </>
      )}
    </div>
  );
};

export default CartPage;
