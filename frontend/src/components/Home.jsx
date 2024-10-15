import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const Home = () => {
    return (
        <Container className="mt-5">
            <Card className="text-center bg-light">
                <Card.Body>
                    <Card.Title as="h1">Welcome to the Job Posting Board</Card.Title>
                    <Card.Text>
                        Your one-stop solution for job postings and applications.
                    </Card.Text>
                    <Button variant="primary" size="lg" href="/post-job">Post a Job</Button>
                    <Button variant="secondary" size="lg" className="ms-2" href="/jobs">View Jobs</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
