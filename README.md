# Full Todo App Frontend - Setup and Run Guide

This guide will help you set up and run the frontend for the Full Todo App. Follow these steps to ensure your environment is properly configured.

## Table of Contents
1. Prerequisites
2. Environment Setup
   - Windows (PowerShell)
   - macOS/Linux (Terminal)
3. Running the Frontend
4. Running with Docker
5. Verifying Installation
6. Troubleshooting

---

## Prerequisites

- **Node.js (16.x or higher)**
- **npm** (Node.js package manager)
- **Okta Developer Account** (for OAuth2 authentication)

## Environment Setup

Before running the frontend, you need to configure the environment variables to interact with the backend and Okta OAuth2.

### Windows (PowerShell)

1. Open PowerShell.
2. Navigate to the frontend project directory.
3. Set the required environment variables using the following commands:

   ```powershell
   # Set the API URL for the backend
   $env:REACT_APP_BACKEND_URL="http://localhost:8081/api/v1"

   # Set Okta variables for OAuth2
   $env:REACT_APP_OKTA_OAUTH2_ISSUER="https://your-okta-issuer-domain/oauth2/default"
   $env:REACT_APP_OKTA_OAUTH2_CLIENT_ID="your-okta-client-id"
   $env:REACT_APP_OKTA_OAUTH2_CLIENT_SECRET="your-okta-client-secret"
   $env:REACT_APP_OKTA_OAUTH2_SCOPES="openid,profile,offline_access"
   ```

   Replace `your-okta-issuer-domain`, `your-okta-client-id`, and `your-okta-client-secret` with the actual values from your Okta Developer Console.

### macOS/Linux (Terminal)

1. Open Terminal.
2. Navigate to the frontend project directory.
3. Set the required environment variables using the following commands:

   ```bash
   # Set the API URL for the backend
   export REACT_APP_BACKEND_URL="http://localhost:8081/api/v1"

   # Set Okta variables for OAuth2
   export REACT_APP_OKTA_OAUTH2_ISSUER="https://your-okta-issuer-domain/oauth2/default"
   export REACT_APP_OKTA_OAUTH2_CLIENT_ID="your-okta-client-id"
   export REACT_APP_OKTA_OAUTH2_CLIENT_SECRET="your-okta-client-secret"
   export REACT_APP_OKTA_OAUTH2_SCOPES="openid,profile,offline_access"
   ```

   Replace `your-okta-issuer-domain`, `your-okta-client-id`, and `your-okta-client-secret` with the actual values from your Okta Developer Console.

## Running the Frontend

### Install Frontend Dependencies

Before running the frontend, you need to install the required dependencies using npm.

1. Open PowerShell (Windows) or Terminal (macOS/Linux).
2. Navigate to the frontend project folder.
3. Run the following command to install the dependencies:

   ```bash
   npm install
   ```

   This command installs all the dependencies listed in `package.json` that are required to run the frontend React app.

### Run the Frontend Development Server

After installing the dependencies, start the development server:

1. Run the following command to start the frontend:

   ```bash
   npm start
   ```

   The React development server will start, and you can access the app by going to `http://localhost:3000` in your browser.

## Running with Docker

To run the frontend as a Docker container:

1. Ensure Docker is installed and running on your machine.
2. Build the Docker image by running the following command in the frontend directory:

   ```bash
   docker build -t full-todo-frontend .
   ```

3. Once the image is built, run the container:

   ```bash
   docker run -p 3000:80 --env-file .env full-todo-frontend
   ```

   Make sure the `.env` file is properly configured with the necessary environment variables, similar to the setup instructions above.

## Verifying Installation

To verify that everything is working correctly, follow these steps:

1. **Access the Frontend Page**: Open a web browser and go to `http://localhost:3000`. You should see the frontend UI of the Full Todo App.
2. **Login with Okta**: Attempt to log in through Okta. You should be redirected to the Okta login page and, upon successful login, returned to the app.
3. **Check Backend Communication**: Ensure the frontend can communicate with the backend, and that you can see and interact with your todos as expected.

## Troubleshooting

- **Environment Variable Issues**: Double-check the values of `REACT_APP_OKTA_OAUTH2_CLIENT_ID` and `REACT_APP_OKTA_OAUTH2_CLIENT_SECRET`. Ensure they match the values from your Okta Developer Console.
- **Backend Communication**: Ensure the backend is running (`http://localhost:8081`) and that the CORS configuration allows the frontend to communicate with it.
- **Missing Dependencies**: If the app doesn’t load correctly, run `npm install` again to ensure all dependencies are installed.
- **Login and CSRF Issues**: If you encounter issues with login or CSRF tokens, check the console for error messages and confirm that the backend is correctly set up to handle cross-origin requests and CSRF protection.

---

If you encounter any other issues, consult the official React and Okta documentation for additional guidance.

