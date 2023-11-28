import React from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
import {  toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const [subtotal, setSubtotal] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const { cartItems } = location.state || {};
  const shipping = 80;
  const navigate = useNavigate();
  const handleSubtotal = () => {
    let sub = 0;
    cartItems.forEach((item: any) => {
      sub += item.price * item.quantity;
    });
    setSubtotal(parseInt(sub.toFixed(2)));
  };
  
  React.useEffect(() => {
    handleSubtotal();
  }, []);
  
  React.useEffect(() => {
    setTotal(parseInt((subtotal + shipping).toFixed(2)));
  }, [subtotal, shipping]);

  const [address, setAddress] = React.useState({
    email: "",
    fullname: "",
    address: "",
    state: "",
    zip: "",
  });

  const handlOnchange = (e: any) => {
    e.preventDefault();
    setAddress({ ...address, [e.target.name]: e.target.value });

  };


  const handleCheckout = async () => {
    
    try {
      const response = await axios.post('https://ecomserver-8wfu.onrender.com/create-order', {
        address,
        cartItems,
        subtotal,
        shipping,
        total,
        status: 'pending',
        date: new Date(),
        userId: localStorage.getItem('userId'),
      });
  
      if (response.status === 200) {
        console.log('Order created successfully:', response.data.message);
        toast.success('Order created successfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/orders')

      } else {
        console.error('Failed to create order:', response);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  
  
  
  return (
    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
        <div className="mt-8 space-y-3 rounded-lg border overflow-y-scroll scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-[450px] px-2 py-4 sm:px-6">
          {cartItems && cartItems.map((item: any, index: number) => (
            <div key={index} className="flex flex-col border border-gray-300  rounded-lg  sm:flex-row">
              <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.imgurl} alt="" />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{item.name}</span>
                <span className="float-right text-gray-400">Quantity: {item.quantity}</span>
                <p className="text-lg w-full text-right font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 border-neutral-600 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Address Details</p>
        <p className="text-gray-400">Complete your order by providing your address details.</p>
        <div className="">
          <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
          <div className="relative">
            <input onChange={handlOnchange} type="text" id="email" name="email" className="input input-bordered w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 " placeholder="your.email@gmail.com" />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
          <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Your Full Name</label>
          <div className="relative">
            <input onChange={handlOnchange} type="text" id="card-holder" name="fullname" className="input input-bordered w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 " placeholder="John Doe..." />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
            </div>
          </div>

          <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
          <div className="flex flex-col sm:flex-row">
            <div className="relative flex-shrink-0 sm:w-7/12">
              <input onChange={handlOnchange} type="text" id="billing-address" name="address" className="input input-bordered w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 " placeholder="Street Address" />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/43d56f605a4ad41c190b7798a99c53bf.svg" alt="" />
              </div>
            </div>
            <input onChange={handlOnchange} type="text" id="card-holder" name="state" className="input input-bordered w-full rounded-md border  px-4 py-3 pl-6 text-sm shadow-sm outline-none focus:z-10 " placeholder="State" />
            <input onChange={handlOnchange} type="number" name="zip" className="input input-bordered w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 " placeholder="ZIP" />
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-200">Subtotal</p>
              <p className="font-semibold text-gray-200">{`₹${subtotal}`}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-200">Shipping</p>
              <p className="font-semibold text-gray-200">{`₹${shipping}`}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-200">Total</p>
            <p className="text-2xl font-semibold text-gray-200">{`₹${total}`}</p>
          </div>
        </div>
        <button onClick={handleCheckout} className=" btn btn-outline mt-4 mb-8 w-full rounded-md  px-6 py-3 font-medium text-white">Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
