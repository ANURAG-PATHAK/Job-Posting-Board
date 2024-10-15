import React, { useEffect, useState } from 'react';
import { getJobs } from '../../services/api';
import { Card, ListGroup, Toast, ToastContainer } from 'react-bootstrap';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await getJobs();
                setJobs(response);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Failed to fetch jobs. Please try again later.');
                setToastMessage('Failed to fetch jobs. Please try again later.');
                setShowToast(true);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <h2>Job Listings</h2>
            {loading ? (
                <p>Loading jobs...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : jobs.length > 0 ? (
                <Card>
                    <ListGroup variant="flush">
                        {jobs.map(job => (
                            <ListGroup.Item key={job._id}>
                                <h5>{job.title}</h5>
                                <p>{job.description}</p>
                                <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
                                <p><strong>End Date:</strong> {new Date(job.endDate).toLocaleDateString()}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            ) : (
                <p>No jobs available at this time.</p>
            )}
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default JobList;
