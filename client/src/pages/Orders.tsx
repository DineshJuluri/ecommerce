import  { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Assuming you store the user ID in localStorage
        if (!userId) {
          throw new Error('User ID not found');
        }
        
        const response = await axios.post('https://ecomserver-8wfu.onrender.com/orders/user', { userId });
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error scenario
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <ul className="divide-y divide-gray-200">
        {orders.map((order: any) => (
          <li key={order._id} className="py-4 flex justify-between items-center">
            <div>
              <span className="font-semibold">Order ID:</span> {order.orderId}
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-lg 
              ${
                order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                'bg-green-200 text-green-800'
              }`}
            >
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
