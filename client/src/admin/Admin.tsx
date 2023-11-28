import { useEffect, useState } from 'react';
import Products from "./Products";
import Orders from "./Orders";
import {ToastContainer} from 'react-toastify'

const Admin = () => {
    const [admin, setAdmin] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('orders'); // Set default value to 'orders'

    useEffect(() => {
        const isAdmin = localStorage.getItem('admin');
        setAdmin(isAdmin ? true : false);
    }, []);

    const handleMenuClick = (menu : string) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="flex h-screen">

            <div className="bg-gray-800 text-white w-1/5 p-4">
                <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
                <ul className="space-y-2">
                    <li
                        className="cursor-pointer hover:text-gray-300"
                        onClick={() => handleMenuClick('products')}
                    >
                        Products
                    </li>
                    <li
                        className="cursor-pointer hover:text-gray-300"
                        onClick={() => handleMenuClick('orders')}
                    >
                        Orders
                    </li>
                </ul>
            </div>
            <div className="flex-grow p-4">
            <ToastContainer/>
                {admin ? (
                    selectedMenu === 'products' ? (
                        <Products/>
                    ) : (
                        <Orders/>
                    )
                ) : (
                    <div>Not Admin</div>
                )}
            </div>
        </div>
    );
};

export default Admin;
