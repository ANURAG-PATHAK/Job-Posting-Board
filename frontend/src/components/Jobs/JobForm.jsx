import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { postJob } from '../../services/api';
import { Card, Button, Form, Spinner, Toast, ToastContainer } from 'react-bootstrap';

const JobForm = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        experienceLevel: '',
        endDate: '',
        candidates: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to post a job.');
            setToastVariant('danger');
            setShowToast(true);
            return;
        }
        const candidates = formData.candidates.split(',').map(email => email.trim());
        setLoading(true);
        try {
            await postJob({ ...formData, candidates });
            setSuccessMessage('Job posted successfully!');
            setToastVariant('success');
            setShowToast(true);
            setFormData({ title: '', description: '', experienceLevel: '', endDate: '', candidates: '' }); // Clear form
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to post the job. Please try again.'); // Improved error handling
            setToastVariant('danger');
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Card className="w-100" style={{ maxWidth: '600px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Post a Job</h2>
                    <form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label column={true}>
                                Job Title <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Job Title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicDescription">
                            <Form.Label column={true}>
                                Job Description <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Job Description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicExperienceLevel">
                            <Form.Label column={true}>
                                Experience Level <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="experienceLevel"
                                placeholder="Experience Level"
                                value={formData.experienceLevel}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEndDate">
                            <Form.Label column={true}>
                                End Date <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCandidates">
                            <Form.Label column={true}>
                                Candidate Emails <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="candidates"
                                placeholder="Candidate Emails (comma separated)"
                                value={formData.candidates}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-100 mt-3"
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : 'Post Job'}
                        </Button>
                    </form>
                </Card.Body>
            </Card>

            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                    bg={toastVariant}
                >
                    <Toast.Body>{error ? error.message : successMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default JobForm;
