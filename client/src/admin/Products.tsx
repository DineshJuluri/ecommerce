import  { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import {toast} from 'react-toastify'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch all products from the backend
    axios.get('https://ecomserver-8wfu.onrender.com/products/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);


  const handleDelete = async (productId:any) => {
    try {
      // Send a DELETE request to your backend API with the productId to delete
      const response = await axios.delete(`https://ecomserver-8wfu.onrender.com/delete-product`, {
        data: { productId }, // Pass the productId in the request body
      });
  
      if (response.status === 200) {
        console.log('Product deleted successfully');
        toast.success('Product deleted successfully');
    }
} catch (error) {
    console.error('Error deleting product:', error);
        // Handle error scenarios here
        toast.error('Error deleting product'); 
    }
  };
  const filteredProducts = products.filter((product:any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="mb-4 flex w-full justify-between">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 px-3 py-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
        onClick={openModal}
        className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Product
      </button>

      {/* Add Product Modal */}
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product:any) => (
          <div key={product._id} className="bg-black rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <div>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
            <img src={product.src} alt={product.name} className="w-full h-auto mb-4 rounded-md" />
            <p>{product.desc}</p>
            {/* Add other product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
