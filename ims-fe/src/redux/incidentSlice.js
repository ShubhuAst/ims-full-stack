import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8085/incident';

export const fetchIncidents = createAsyncThunk('incidents/fetchIncidents', async ({
                                                                                      userId,
                                                                                      authData
                                                                                  }, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/getByUser/${userId}`, {
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

export const fetchIncidentsBySearch = createAsyncThunk('incidents/fetchIncidentsBySearch', async ({
                                                                                                      searchIdLike,
                                                                                                      authData
                                                                                                  }, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/getById?idLike=${searchIdLike}`, {
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

export const createIncident = createAsyncThunk('incidents/createIncident', async ({
                                                                                      incidentData,
                                                                                      authData
                                                                                  }, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/create`, incidentData, {
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

export const updateIncident = createAsyncThunk('incidents/updateIncident', async ({
                                                                                      incidentData,
                                                                                      authData
                                                                                  }, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${API_URL}/update`, incidentData, {
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

export const deleteIncident = createAsyncThunk('incidents/deleteIncident', async ({
                                                                                      id,
                                                                                      authData
                                                                                  }, {rejectWithValue}) => {
    try {
        await axios.delete(`${API_URL}/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${authData.username}:${authData.password}`)}`,
            }
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const incidentSlice = createSlice({
    name: 'incidents',
    initialState: {
        incidents: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncidents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIncidents.fulfilled, (state, action) => {
                state.loading = false;
                state.incidents = action.payload.data;
            })
            .addCase(fetchIncidents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(createIncident.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createIncident.fulfilled, (state, action) => {
                state.loading = false;
                state.incidents.push(action.payload.data);
            })
            .addCase(createIncident.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(updateIncident.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateIncident.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.incidents.findIndex(incident => incident.id === action.payload.data.id);
                if (index !== -1) {
                    state.incidents[index] = action.payload.data;
                }
            })
            .addCase(updateIncident.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(deleteIncident.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteIncident.fulfilled, (state, action) => {
                state.loading = false;
                state.incidents = state.incidents.filter(incident => incident.id !== action.payload);
            })
            .addCase(deleteIncident.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            })
            .addCase(fetchIncidentsBySearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIncidentsBySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.incidents = action.payload.data;
            })
            .addCase(fetchIncidentsBySearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.msg;
            });
    },
});

export default incidentSlice.reducer;
