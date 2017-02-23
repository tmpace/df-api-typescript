# Base Node 6.1.0
FROM node:6.1

# Add all files in the current directory into the /app folder
ADD . /app

# Set our working directory to /app
WORKDIR /app

# Install TypeScript and Project Dependencies
RUN npm install --silent -g typescript

# Install Project Dependencies
RUN npm install --silent

# Compile Typescript
RUN tsc

# Run the server
CMD ["npm", "start"]
