# Step 1: Build the frontend using Node.js
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY . .


RUN npm run build



FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
