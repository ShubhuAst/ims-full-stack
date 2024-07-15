import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteIncident, fetchIncidents, fetchIncidentsBySearch} from '../../redux/incidentSlice';
import IncidentForm from './IncidentForm';
import {format} from "date-fns";

const IncidentList = () => {
    const dispatch = useDispatch();
    const {incidents, loading, error} = useSelector((state) => state.incidents);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentIncident, setCurrentIncident] = useState(null);
    const [reloadIncident, setReloadIncident] = useState(false);
    const [searchId, setSearchId] = useState('');
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const authData = {
            username: user.email,
            password: user.password,
        };
        const id = user.id;
        dispatch(fetchIncidents({userId: id, authData}));
        setReloadIncident(false);
    }, [dispatch, user.email, user.id, user.password, reloadIncident]);

    const handleCreate = () => {
        setCurrentIncident(null);
        setIsFormOpen(true);
    };

    const handleEdit = (incident) => {
        setCurrentIncident(incident);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        const authData = {
            username: user.email,
            password: user.password,
        };
        dispatch(deleteIncident({id, authData}));
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setCurrentIncident(null);
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) {
        const errorMessage = error.msg || JSON.stringify(error);
        return <div className="p-4">Error: {errorMessage}</div>;
    }

    const handleChange = (e) => {
        setSearchId(e.target.value);
    };

    const handleSearch = () => {
        if (searchId.length === 0) {
            setReloadIncident(true)
        }
        if (searchId.length > 3) {
            const authData = {
                username: user.email,
                password: user.password,
            };
            dispatch(fetchIncidentsBySearch({searchIdLike: searchId, authData}));
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                    Create New Incident
                </button>
                <div className="flex">
                    <input
                        type="text"
                        name="detail"
                        placeholder="Search By ID"
                        value={searchId}
                        onChange={handleChange}
                        className="border p-2 rounded mr-2"
                        required
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </div>
            </div>

            <ul>
                {incidents.length > 0 ? (
                    incidents.map((incident) => (
                        <li key={incident.id} className="border p-4 rounded mb-4 flex justify-between items-center">
                            <div className="flex-1">
                                <p className="text-lg font-bold mb-2">Id: {incident.id}</p>
                                <p className="inline-block mr-4">Detail: {incident.detail}</p>
                                <p className="inline-block mr-4">Priority: {incident.priority}</p>
                                <p className="inline-block mr-4">Status: {incident.status}</p>
                                <p className="inline-block">Date: {format(new Date(incident.reportDate), 'dd-MM-yyyy HH:mm:ss')}</p>
                            </div>
                            <div>
                                {incident.status !== "CLOSED" && (
                                    <button onClick={() => handleEdit(incident)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                                        Edit
                                    </button>
                                )}
                                <button onClick={() => handleDelete(incident.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="p-4">No incidents found</div>
                )}
            </ul>
            {isFormOpen && <IncidentForm incident={currentIncident} onClose={closeForm}/>}
        </div>
    );
};

export default IncidentList;
