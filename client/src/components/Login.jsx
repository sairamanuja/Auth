import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Both fields are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email,
                password,
            });

            setMessage(response.data.message);
            
            // Show welcome message
            setShowWelcome(true);
            setMessage(`Welcome back, ${response.data.user.name}!`);

            // Store user info in localStorage if needed
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect after a short delay to show the welcome message
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="bg-customPurple h-screen w-screen flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="w-full lg:w-[50%] h-[100%] flex justify-center items-center">
                <img
                    src="/365.jpg"
                    className="w-[100%] h-[530px] rounded-lg object-cover"
                    alt="Login illustration"
                />
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-[50%] h-[100%] flex justify-center items-center">
                <div className="w-[500px] h-auto rounded-lg">
                    {showWelcome ? (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">{message}</h2>
                            <p className="text-gray-300">Redirecting to dashboard...</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-2xl font-medium pl-10 pt-10 text-white">Welcome back!</p>
                            <p className="text-sm pl-10 text-gray-500">
                                Don't have an account?{' '}
                                <a href="/" className="text-pt hover:underline">
                                    Signup
                                </a>
                            </p>
                            <div className="flex flex-col items-start pt-7 pl-10 gap-4">
                                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="p-2 rounded-lg text-white bg-ct w-[450px]"
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="p-2 rounded-lg text-white bg-ct w-[450px]"
                                    />
                                    {message && (
                                        <p className="text-red-500">{message}</p>
                                    )}
                                    <button
                                        className="bg-cc hover:bg-cc-dark text-white p-2 rounded-lg w-[450px]"
                                        type="submit"
                                    >
                                        Login
                                    </button>
                                    <a 
                                        href="/forgetpass" 
                                        className="text-pt hover:underline text-center"
                                    >
                                        Forgot Password?
                                    </a>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;