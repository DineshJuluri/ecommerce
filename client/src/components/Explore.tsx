import { useState, useEffect } from "react";
import Product from "./Product";
import axios from 'axios';

const Explore = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://ecomserver-8wfu.onrender.com/products');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); 
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((item, index) => (
                <Product data={item} key={index} />
            ))}
        </div>
    );
};

export default Explore;
