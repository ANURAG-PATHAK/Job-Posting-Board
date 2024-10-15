import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import JobForm from './components/Jobs/JobForm';
import JobList from './components/Jobs/JobList';
import NotFound from './components/NotFound';
import { Container } from 'react-bootstrap';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="min-vh-100 d-flex flex-column bg-light">
                    <Navbar />
                    <Container className="flex-grow-1 p-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/jobs"
                                element={
                                    <ProtectedRoute>
                                        <JobList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/post-job"
                                element={
                                    // <ProtectedRoute>
                                        <JobForm />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Container>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
