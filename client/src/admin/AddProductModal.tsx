import  { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const [productData, setProductData] = useState({
    name: '',
    desc: '',
    src: '',
    offerPrice: '',
    sellingPrice: ''
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleAddProduct = () => {
    axios.post('https://ecomserver-8wfu.onrender.com/add-product', productData)
      .then(response => {
        console.log(response.data); // Success message from backend
        toast.success('Product added successfully!');
        onClose(); // Close the modal after adding the product
      })
      .catch(error => {
        console.error('Error adding product:', error);
        toast.error('Error adding product. Please try again.');
        // Handle error case
      });
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="src">Image URL:</label>
            <input
              type="text"
              id="src"
              name="src"
              value={productData.src}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="sellingPrice">Selling Price:</label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={productData.sellingPrice}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="offerPrice">Offer Price:</label>
            <input
              type="number"
              id="offerPrice"
              name="offerPrice"
              value={productData.offerPrice}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="desc">Description:</label>
            <textarea
              id="desc"
              name="desc"
              value={productData.desc}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full h-24"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
