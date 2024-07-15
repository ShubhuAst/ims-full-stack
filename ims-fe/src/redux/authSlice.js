import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8085/auth';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/forgotPassword/${email}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (formdata, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/resetPassword`, formdata, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (authData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${authData.username}:${authData.password}`)}`,
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: '',
        address: {
            id: null,
            city: '',
            state: '',
            country: '',
            addressLine: '',
            zipCode: ''
        }
    },
    loading: false,
    error: null,
};

const storedUser = localStorage.getItem('user');
if (storedUser) {
    initialState.user = JSON.parse(storedUser);
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.user = initialState.user;
            localStorage.removeItem('user');
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                setUser(state, action);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                setUser(state, action);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = initialState.user;
                localStorage.removeItem('user');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.user = initialState.user;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            });
    },
});

export const {setUser, clearUser, resetError} = authSlice.actions;
export default authSlice.reducer;
