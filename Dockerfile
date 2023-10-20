# Use an official node runtime as the parent image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Specify port app will be listening on
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
