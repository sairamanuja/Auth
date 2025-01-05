import { useState } from 'react';
import axios from 'axios';

const Forgetpass = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgetpass = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:3000/api/forget', { email });
            
            if (response.data.success) {
                setSuccess(response.data.message);
                setEmail(''); // Clear the email input
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Forget Password</h1>
                <form onSubmit={handleForgetpass} className="space-y-4">
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <div>
                        <label className="block text-gray-700 mb-2">Email Address</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email" 
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500" 
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors
                            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                    <div className="text-center">
                        <a href="/login" className="text-purple-600 hover:underline">
                            Back to Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Forgetpass;