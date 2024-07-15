import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createIncident, updateIncident} from '../../redux/incidentSlice';
import {format} from 'date-fns';

const IncidentForm = ({incident, onClose}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        userId: user.id,
        reporterName: user?.firstName + ' ' + user?.lastName || '',
        detail: '',
        reportDate: new Date(),
        priority: 'LOW',
        status: 'OPEN',
    });

    useEffect(() => {
        if (incident) {
            setFormData({
                ...incident,
                reportDate: new Date(incident.reportDate),
            });
        }
    }, [incident]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const authData = {
            username: user.email,
            password: user.password,
        };
        const formattedDate = format(formData.reportDate, 'dd-MM-yyyy HH:mm:ss');
        setFormData({
            ...formData,
            reportDate: formattedDate
        });
        if (incident) {
            dispatch(updateIncident({incidentData: {...formData, id: incident.id}, authData}));
        } else {
            dispatch(createIncident({incidentData: formData, authData}));
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{incident ? 'Edit Incident' : 'Create Incident'}</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="reporterName"
                        placeholder="Reporter Name"
                        value={formData.reporterName}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        readOnly
                    />
                    <input
                        type="text"
                        name="detail"
                        placeholder="Detail"
                        value={formData.detail}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="date"
                        name="reportDate"
                        placeholder="Report Date"
                        value={formData.reportDate}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">
                    {incident ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={onClose} className="bg-red-500 text-white p-2 rounded mt-4 w-full">
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default IncidentForm;
