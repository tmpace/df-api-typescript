# Base Node 6.1.0
FROM node:6.1

# Add all files in the current directory into the /app folder
ADD . /app

# Install TypeScript and Project Dependencies
RUN cd /app  \
    && npm install --silent -g typescript \
    && npm install --silent

# Compile Typescript
RUN cd /app \
    && tsc

# Expose our applications port
EXPOSE 8000

# Run the server
CMD ["node", "/app/dist/index.js"]
