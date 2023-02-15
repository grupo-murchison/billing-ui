# Stage 1: Use yarn to build the app
FROM node:14 as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build-ocp

# Stage 2: Copy the build (JS React SPA) into the Nginx HTML directory
FROM bitnami/nginx:latest
# Overwrite nginx config
COPY nginx.conf /opt/bitnami/nginx/conf/server_blocks/ 

COPY --from=builder /usr/src/app/dist /app

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]