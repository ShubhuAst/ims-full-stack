import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword, resetError} from '../../redux/authSlice';
import ResetPassword from './ResetPassword';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);

    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
        setShowResetForm(true);
    };

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            {!showResetForm ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            ) : (
                <ResetPassword email={email}/>
            )}
        </div>
    );
};

export default ForgotPassword;
