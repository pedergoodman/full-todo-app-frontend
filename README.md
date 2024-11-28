Prerequisites

Node.js (16.x or higher) and npm (Node.js package manager)

Okta Developer Account (for OAuth2 authentication)

Environment Setup

Before running the frontend, you need to configure the environment variables to interact with the backend and Okta OAuth2.

Windows Users (PowerShell)

Open PowerShell.

Navigate to the frontend directory.

Run the following commands to set the required environment variables:

# Set the API URL for the backend
$env:REACT_APP_BACKEND_URL="http://localhost:8080/api/v1"

# Set Okta variables for OAuth2
$env:REACT_APP_OKTA_OAUTH2_ISSUER="https://dev-74889125.okta.com/oauth2/default"
$env:REACT_APP_OKTA_OAUTH2_CLIENT_ID="your-okta-client-id"
$env:REACT_APP_OKTA_OAUTH2_CLIENT_SECRET="your-okta-client-secret"
$env:REACT_APP_OKTA_OAUTH2_SCOPES="openid,profile,offline_access"

Replace your-okta-client-id and your-okta-client-secret with the actual values from your Okta Developer Console.

macOS/Linux Users (Terminal)

Open Terminal.

Navigate to the frontend directory.

Run the following commands to set the required environment variables:

# Set the API URL for the backend
export REACT_APP_BACKEND_URL="http://localhost:8080/api/v1"

# Set Okta variables for OAuth2
export REACT_APP_OKTA_OAUTH2_ISSUER="https://dev-74889125.okta.com/oauth2/default"
export REACT_APP_OKTA_OAUTH2_CLIENT_ID="your-okta-client-id"
export REACT_APP_OKTA_OAUTH2_CLIENT_SECRET="your-okta-client-secret"
export REACT_APP_OKTA_OAUTH2_SCOPES="openid,profile,offline_access"

Replace your-okta-client-id and your-okta-client-secret with the actual values from your Okta Developer Console.

Step 2: Install Frontend Dependencies

Before running the frontend, you need to install the required dependencies using npm.

Open PowerShell (Windows) or Terminal (macOS/Linux).

Navigate to the frontend project folder.

Run the following command to install the dependencies:

npm install

This command installs all the dependencies listed in package.json that are required to run the frontend React app.

Step 3: Run the Frontend Development Server

After installing the dependencies, start the development server:

Run the following command to start the frontend:

npm start

The React development server will start, and you can access the app by going to http://localhost:3000 in your browser.

Step 4: Verify the Application is Running

Once the frontend development server is running, open your browser and navigate to:

http://localhost:3000

You should see the React app and be able to interact with it, including logging in via Okta and making requests to the backend.

Troubleshooting

Environment Variable Issues: Double-check the values of REACT_APP_OKTA_OAUTH2_CLIENT_ID and REACT_APP_OKTA_OAUTH2_CLIENT_SECRET. Ensure they match the values from your Okta Developer Console.

Backend Communication: Ensure the backend is running (http://localhost:8080) and that the CORS configuration allows the frontend to communicate with it.

Missing Dependencies: If the app doesn’t load correctly, run npm install again to ensure all dependencies are installed.

Login and CSRF Issues: If you encounter issues with login or CSRF tokens, check the console for error messages and confirm that the backend is correctly set up to handle cross-origin requests and CSRF protection.