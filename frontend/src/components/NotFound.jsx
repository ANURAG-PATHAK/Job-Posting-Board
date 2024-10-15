import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card className="text-center bg-light shadow-lg">
                <Card.Body>
                    <Card.Title as="h2">404 Not Found</Card.Title>
                    <Card.Text>
                        The page you are looking for does not exist.
                    </Card.Text>
                    <Button variant="primary" href="/" className="mt-3">
                        Go to Home
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NotFound;
