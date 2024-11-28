# Use Node image to build the React frontend
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the .env file
COPY .env .env

# Copy the rest of the frontend code and build it
COPY . ./
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that the server will run on
EXPOSE 80
