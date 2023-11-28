import axios from 'axios';
import { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {useCart } from '../context/CartContext';


const Product = (props: { data: any }) => {
    const userId = useState(localStorage.getItem('userId'));
    const { setCartCount } = useCart();
    const handleAddtoCart = (productId: string) => {    
        if (!userId) {
            console.error('User ID not found');
            return;
        }

        axios.post('https://ecomserver-8wfu.onrender.com/add-to-cart', { userId, productId })
            .then(response => {
                toast.success('Product added to cart');
                setCartCount((previousCount: number) => previousCount + 1); 
                console.log(response.data);
            })
            .catch(error => {
                toast.error('Error adding product to cart');
                console.error('Error adding product to cart:', error);
            });
    };
    return (
            <div className="mx-auto mt-11 cursor-pointer w-72 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img className="h-48 w-full object-cover object-center" src={props.data['src']} alt="Product Image" />
                <div className="p-4">
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{props.data['name']}</h2>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{props.data['desc']}</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${props.data['offerPrice']}</p>
                        <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">${props.data['sellingPrice']}</p>
                        <p className="ml-auto text-base font-medium text-green-500">{Math.round(props.data['offerPercentage'])}% off</p>
                        <div className="tooltip" data-tip="add to cart">
                            <button onClick={()=>handleAddtoCart(props.data['_id'])} className="ml-3 mr-3 focus:outline-none">
                                <FaCartPlus size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Product;
