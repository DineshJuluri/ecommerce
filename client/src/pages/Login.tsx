import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../components/Alert"
import axios from "axios"


const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState('message');
    const [errorStatus, setErrorStatus] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setCreating(true);
            const response = await axios.post('https://ecomserver-8wfu.onrender.com/login', user);
            if (response.data.email == user.email) {
                localStorage.setItem('userId', response.data._id);
                localStorage.setItem('token', response.data._id);
                navigate('/');
                window.location.reload();
            }else if (response.data == "Incorrect password") {
                setErrorStatus(true);
                setError(response.data);
            }else if (response.data == "Email not found") {
                setErrorStatus(true);
                setError(response.data);
            }else{
                setErrorStatus(true);
                setError("Something went wrong");
            }
            if (response.data == "Login successful") {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', "token");
                navigate('/');
                window.location.reload();
            }else if (response.data == "Incorrect password") {
                setErrorStatus(true);
                setError(response.data);
            }else if (response.data == "User not found") {
                setErrorStatus(true);
                setError(response.data);
            }else{
                setErrorStatus(true);
                setError(response.data);
            }
    };
    

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Create an account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                {
                        errorStatus ?
                            <Alert errortext={error} />
                            : null
                    }
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                    <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                            {
                                creating && <span className="mt-1 ml-3  loading loading-spinner loading-xs"></span>

                            }
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    New user?{' '}
                    <Link to="/signup"><a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign Up
                    </a></Link>
                </p>
            </div>
        </div>
    )
}

export default Login
