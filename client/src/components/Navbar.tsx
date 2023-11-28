import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import axios from 'axios';
interface UserData {
    fullName: string;
    // other properties if available
  }
const Navbar = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { cartCount, setCartCount } = useCart();

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
        if (isLogin) {
            fetchCartItemCount();
        }
        
    }, [isLogin]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLogin(false);
        window.location.reload();
    };

    const fetchCartItemCount = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch(`https://ecomserver-8wfu.onrender.com/total-cart-items/${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Cart item count:', data.totalQuantity);
                setCartCount(data.totalQuantity); // Update cart count using the context function
                const respodnse = await axios.post('https://ecomserver-8wfu.onrender.com/get-user-details', { userId });
                setUserData(respodnse.data.user);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    return (
        <div className="navbar bg-base-100 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link to={"/home"}><li><a>Home</a></li></Link>
                        <Link to={"/shop"}><li><a>Shop</a></li></Link>
                        <Link to={"/about"}><li><a>About</a></li></Link>
                        <Link to={"/contact"}><li><a>Contact</a></li></Link>

                    </ul>
                </div>
                <Link to={'/'}><a className="btn btn-ghost text-xl">VirtuoMart</a></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Link to={"/home"}><li><a>Home</a></li></Link>
                    <Link to={"/shop"}><li><a>Shop</a></li></Link>
                    <Link to={"/about"}><li><a>About</a></li></Link>
                    <Link to={"/contact"}><li><a>Contact</a></li></Link>


                </ul>
            </div>
            <div className="navbar-end mr-2">
                {
                    isLogin ?
                        <div className="dropdown dropdown-end">
                            <Link to='/cart'><div className="indicator mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cartCount}</span>
                            </div>
                            </Link>
                            
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>{userData?.fullName}</a></li>
                                <Link to={'/orders'}><li><a>Orders</a></li></Link>
                                <li onClick={handleLogout}><a>Logout</a></li>
                            </ul>
                        </div>
                        :
                        <Link to={'/login'}><a className="btn">Login</a></Link>
                }

            </div>
        </div>
    )
}

export default Navbar

