import { Route, Routes } from "react-router"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Shop from "./pages/Shop"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Admin from "./admin/Admin";
import { CartProvider } from './context/CartContext.jsx';
import { useEffect,useState } from "react";
const App = () => {
  const [isAdmin,setIsAdmin]= useState(false)
  useEffect(() => {
    localStorage.getItem('admin')
    ? setIsAdmin(true)
    : setIsAdmin(false)
  }, [])
  return (
    

    <div className="App">
      {
        isAdmin?
        <Admin/>
        :
        <CartProvider>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/orders" element={<Orders/>} />
        </Routes>
        <ToastContainer position="bottom-center" />
        <Footer/>
        </CartProvider>
      }
        
    </div>
  )
}

export default App
