
# Job-Posting-Board

## How to get started

### Environment Setup

1. Add These environment variables in

#### ./backend/.env

```env
APP_URL=http://localhost:3000              # Backend server URL
CLIENT_URL=https://yourfrontend.vercel.app  # Frontend URL
EMAIL_FROM=youremail@gmail.com             # Sender email for notifications
EMAIL_PASSWORD=your-email-app-password     # App password for sending emails via Gmail
EMAIL_SERVICE=Gmail                        # Email service provider
EMAIL_USERNAME=youremail@gmail.com         # Email used to generate the app password
JWT_SECRET=your-jwt-secret                 # Secret key for JWT token generation
MONGO_URI=mongodb://localhost:27017/jobdb  # MongoDB connection URI
```

#### ./frontend/.env

```env
VITE_API_URL=http://localhost:3000          # Backend API URL
```

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    npm run start
    ```

    The backend server will start on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm run dev
    ```

    The frontend server will start on `http://localhost:5173` (or a different port depending on your environment).

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - Bootstrap
  - Vite

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT
