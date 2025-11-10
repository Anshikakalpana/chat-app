FROM node:20-alpine AS build

WORKDIR /app

# Accept build args and export them as ENV so Vite picks them up during build
ARG VITE_API_URL
ARG VITE_SOCKET_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}

# Copy package files first (for caching)
COPY package*.json ./

RUN npm install

# Copy source
COPY . .

# Build (Vite will embed VITE_API_URL / VITE_SOCKET_URL from ENV)
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]