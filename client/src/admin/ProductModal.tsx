// ProductModal.js
import { useState, useEffect } from 'react';
import axios from 'axios';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string; // Update with the correct type if 'productId' is not a string
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, productId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isOpen && productId) {
      fetchProducts(productId);
    }
  }, [isOpen, productId]);

  const fetchProducts = async (productId:any) => {
    try {
      const response = await axios.get(`https://ecomserver-8wfu.onrender.com/orders/products/${productId}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Products in this Order</h2>
          <div className="product-list">
            {products.map((product:any) => (
              <div key={product._id} className="product">
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                {/* Display other product details */}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductModal;
