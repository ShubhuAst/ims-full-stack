import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetError, resetPassword} from '../../redux/authSlice';
import {useNavigate} from "react-router-dom";

const ResetPassword = ({email}) => {
    const [formData, setFormData] = useState({
        email: email,
        otp: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        const result = await dispatch(resetPassword(formData));
        if (resetPassword.fulfilled.match(result)) {
            navigate('/signin');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                <div>
                    <p className="mb-2">Enter the OTP sent to {email}</p>
                    <input
                        type="text"
                        name="otp"
                        placeholder="OTP"
                        value={formData.otp}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mt-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mt-4">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
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
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;

