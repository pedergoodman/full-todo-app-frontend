Setting Up and Running the Frontend

The frontend is built using React, and to run it locally, you'll need to set up environment variables and start the development server.
Step 1: Set Environment Variables

For the frontend to interact with the backend and Okta, you need to set up a few environment variables. These include the API URLs for backend communication and Okta settings.
Windows Users (Using PowerShell)

    Open PowerShell on your computer.
    Navigate to the frontend directory.
    Run the following commands to set the required environment variables:

# Set the API URL for the backend
$env:REACT_APP_BACKEND_URL="http://localhost:8080/api/v1"

# Set Okta variables for OAuth2
$env:REACT_APP_OKTA_OAUTH2_ISSUER="https://dev-74889125.okta.com/oauth2/default"
$env:REACT_APP_OKTA_OAUTH2_CLIENT_ID="your-okta-client-id"
$env:REACT_APP_OKTA_OAUTH2_CLIENT_SECRET="your-okta-client-secret"
$env:REACT_APP_OKTA_OAUTH2_SCOPES="openid,profile,offline_access"

Important: Replace your-okta-client-id and your-okta-client-secret with the actual values from your Okta Developer Console.
macOS Users (Using Terminal)

    Open Terminal on your macOS machine.
    Navigate to the frontend directory.
    Run the following commands to set the required environment variables:

# Set the API URL for the backend
export REACT_APP_BACKEND_URL="http://localhost:8080/api/v1"

# Set Okta variables for OAuth2
export REACT_APP_OKTA_OAUTH2_ISSUER="https://dev-74889125.okta.com/oauth2/default"
export REACT_APP_OKTA_OAUTH2_CLIENT_ID="your-okta-client-id"
export REACT_APP_OKTA_OAUTH2_CLIENT_SECRET="your-okta-client-secret"
export REACT_APP_OKTA_OAUTH2_SCOPES="openid,profile,offline_access"

Important: Replace your-okta-client-id and your-okta-client-secret with the actual values from your Okta Developer Console.
Step 2: Install Frontend Dependencies

Before running the frontend app, you need to install the required dependencies using npm (Node.js package manager).

    Open PowerShell (Windows) or Terminal (macOS) and navigate to the frontend project folder.
    Run the following command to install the dependencies:

# For both Windows and macOS
npm install

This command installs all the dependencies listed in package.json that are required to run the frontend React app.
Step 3: Run the Frontend Development Server

After installing the dependencies, you can start the development server.

    In PowerShell (Windows) or Terminal (macOS), run the following command to start the frontend app:

# For both Windows and macOS
npm start

    This will start the React development server. You can access the app by going to http://localhost:3000 in your browser.

Step 4: Verify the Application is Running

Once the frontend development server starts, open your browser and go to:

    http://localhost:3000

You should see the React app running and be able to interact with it, logging in via Okta and making requests to the backend.
Troubleshooting

    If you encounter errors related to environment variables, double-check the values of REACT_APP_OKTA_OAUTH2_CLIENT_ID and REACT_APP_OKTA_OAUTH2_CLIENT_SECRET.
    Ensure that the backend is running (http://localhost:8080), and that the CORS configuration is correct to allow the frontend to communicate with the backend.
    If the app doesn’t load properly, try running npm install again to ensure all dependencies are correctly installed.