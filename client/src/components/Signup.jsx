import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!username || !email || !password) {
            alert("All fields are required!");
            return;
        }
        if (!agreeToTerms) {
            alert("You must agree to the terms and conditions.");
            return;
        }

        
        console.log({
            username,
            email,
            password,
        });
        try {
            
            const response = await axios.post('http://localhost:3000/api/signup', {
              name: username,
              email,
              password,
            });
      
            setMessage(response.data.message);
            console.log('Signup successful:', response.data);
            navigate('/verify');
          } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Signup failed.');
        }

    };

    return (
        <div className="bg-customPurple h-screen w-screen flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="hidden lg:flex w-[50%] h-[100%] justify-center items-center">
                <img
                    src="/public/365.jpg"
                    className="w-[96%] h-[530px] rounded-lg object-cover"
                    alt="Signup illustration"
                />
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-[50%] h-[100%] flex justify-center items-center">
                <div className="w-[90%] max-w-[500px] rounded-lg">
                    <p className="text-2xl font-medium text-center lg:text-left pt-10 text-white">
                        Create an account
                    </p>
                    <p className="text-sm text-center lg:text-left text-gray-500">
                        Already have an account?{' '}
                        <a
                            href="http://localhost:5173/login"
                            className="text-pt hover:underline"
                        >
                            Login
                        </a>
                    </p>
                    <div className="flex flex-col items-center lg:items-start pt-6 gap-4">
                        <form
                            className="flex flex-col gap-4 w-full"
                            onSubmit={handleSignup}
                        >
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Username"
                                className="p-2 rounded-lg bg-ct text-white w-full"
                            />

                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                                className="p-2 rounded-lg bg-ct text-white w-full"
                            />

                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="p-2 rounded-lg bg-ct text-white w-full"
                            />

                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="mt-1"
                                />
                                <label htmlFor="agreeToTerms" className="text-sm text-gray-500">
                                    I Agree to the{' '}
                                    <span className="text-pt hover:underline">
                                        Terms of Service
                                    </span>{' '}
                                    and{' '}
                                    <span className="text-pt hover:underline">
                                        Privacy Policy
                                    </span>
                                </label>
                            </div>

                            {message && (
                                <p className={`text-sm ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                                    {message}
                                </p>
                            )}

                            <button
                                className="bg-cc hover:bg-cc-dark text-white p-2 rounded-lg w-full"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
