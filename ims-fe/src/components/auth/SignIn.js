import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, resetError} from '../../redux/authSlice';
import {Link, useNavigate} from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error} = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));
        if (loginUser.fulfilled.match(result)) {
            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mt-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mt-4">{error.msg || JSON.stringify(error)}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
                    disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
                <div className="mt-2 text-center">
                    <Link to="/forgotpassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
