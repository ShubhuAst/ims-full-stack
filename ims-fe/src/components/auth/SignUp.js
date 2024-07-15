import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {registerUser, resetError} from "../../redux/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
        city: '',
        state: '',
        country: '',
        addressLine: '',
        zipCode: '',
    });

    const {error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [focusedInput, setFocusedInput] = useState('');

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

    const handleFocus = (e) => {
        setFocusedInput(e.target.name);
    };

    const handleBlur = () => {
        setFocusedInput('');
    };

    const handleZipCodeChange = async (e) => {
        const zipCode = e.target.value;
        setFormData({
            ...formData,
            zipCode: zipCode,
        });
        if (zipCode.length <= 5 || zipCode.length >= 8) {
            return;
        }
        try {
            const response = await axios.get(`https://api.zippopotam.us/IN/${zipCode}`);
            const {country, places} = response.data;
            if (country && places && places.length > 0) {
                const {state, 'place name': city} = places[0];
                setFormData({
                    ...formData,
                    country: country,
                    state: state,
                    city: city,
                    zipCode: zipCode,
                });
            }
        } catch (error) {
            alert('ZipCode Details Not Available!')
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const result = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(result)) {

            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        {formData.firstName && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'firstName' ? 'text-blue-500' : ''
                                }`}
                            >
                                First Name
                            </label>
                        )}
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'firstName' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.lastName && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'lastName' ? 'text-blue-500' : ''
                                }`}
                            >
                                Last Name
                            </label>
                        )}
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'lastName' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.email && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'email' ? 'text-blue-500' : ''
                                }`}
                            >
                                Email
                            </label>
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'email' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.contactNumber && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'contactNumber' ? 'text-blue-500' : ''
                                }`}
                            >
                                Contact Number
                            </label>
                        )}
                        <input
                            type="text"
                            name="contactNumber"
                            placeholder="Contact Number"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'contactNumber' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.password && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'password' ? 'text-blue-500' : ''
                                }`}
                            >
                                Password
                            </label>
                        )}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'password' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.confirmPassword && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'confirmPassword' ? 'text-blue-500' : ''
                                }`}
                            >
                                Confirm Password
                            </label>
                        )}
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'confirmPassword' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.addressLine && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'addressLine' ? 'text-blue-500' : ''
                                }`}
                            >
                                Address Line
                            </label>
                        )}
                        <input
                            type="text"
                            name="addressLine"
                            placeholder="Address Line"
                            value={formData.addressLine}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'addressLine' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.city && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'city' ? 'text-blue-500' : ''
                                }`}
                            >
                                City
                            </label>
                        )}
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'city' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.state && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'state' ? 'text-blue-500' : ''
                                }`}
                            >
                                State
                            </label>
                        )}
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'state' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.country && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'country' ? 'text-blue-500' : ''
                                }`}
                            >
                                Country
                            </label>
                        )}
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'country' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        {formData.zipCode && (
                            <label
                                className={`absolute top-0 left-2 -mt-2 bg-white px-1 text-xs text-gray-600 ${
                                    focusedInput === 'zipCode' ? 'text-blue-500' : ''
                                }`}
                            >
                                Zip Code
                            </label>
                        )}
                        <input
                            type="text"
                            name="zipCode"
                            placeholder="Zip Code"
                            value={formData.zipCode}
                            onChange={handleZipCodeChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={`border p-2 rounded ${
                                focusedInput === 'zipCode' ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            required
                        />
                    </div>
                </div>
                {error && <p className="text-red-500 mt-4">{error.msg || JSON.stringify(error)}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
