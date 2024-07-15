import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../redux/authSlice';
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const authData = {
            username: user.email,
            password: user.password,
        };
        const result = await dispatch(logoutUser(authData));
        if (logoutUser.fulfilled.match(result)) {
            navigate('/signin');
        }
    };

    return (
        <nav className="flex justify-between items-center bg-blue-500 p-4 text-white">
            <div className="text-xl font-bold">Incident Management System</div>

            <div className="flex items-center">
                <div className="mr-4">{user?.email}</div>
                {user && (
                    <button
                        onClick={handleLogout}
                        className="bg-transparent hover:bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
