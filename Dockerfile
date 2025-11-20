# Use Node 18 on Alpine Linux (lightweight)
FROM node:18-alpine

# Install FFmpeg (Crucial for streaming)
RUN apk add --no-cache ffmpeg

# Set working directory
WORKDIR /app

# Copy package definitions
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app source
COPY . .

# Expose port (needed for health checks on clouds)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
