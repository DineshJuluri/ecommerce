import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the server
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://ecomserver-8wfu.onrender.com/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error, display a message, etc.
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: any, newStatus: string) => {
    try {
      const response = await axios.put(`https://ecomserver-8wfu.onrender.com/update-order-status/${orderId}`, { status: newStatus });
      console.log('Order status updated:', response.data);
      toast.success('Order status updated successfully!');
      setOrders((prevOrders:any) =>
        prevOrders.map((order:any) => {
          if (order._id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        })
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul>
        {orders.map((order:any) => (
          <li key={order._id} className="bg-black rounded shadow p-4 mb-4">
            <div>
              <p className="mb-2">Order ID: {order._id}</p>
              <p>
                Products: {Array.isArray(order.cartItems) && order.cartItems.length > 0
                  ? order.cartItems.map((item: { name: any; }) => item.name).join(', ')
                  : 'No products'}
              </p>
              <p className="mb-2">
                Status:
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="ml-2 p-2 bg-black rounded border"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
