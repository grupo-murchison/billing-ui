# Stage 1: Use yarn to build the app
FROM node:14 as builder
WORKDIR /usr/src/app
# Instalar Dependencias
COPY package.json yarn.lock ./
RUN yarn --production=false

# Params
ARG NODE_ENV

# Environment
ENV mode $NODE_ENV
ENV NODE_ENV production
RUN echo "ARG NODE_ENV (mode):" $mode

# BUILD APP
COPY . ./
RUN yarn run build --mode=$mode

# SERVER
# Stage 2: Copy the build (JS React SPA) into the Nginx HTML directory
FROM bitnami/nginx:latest

# Overwrite nginx config
COPY nginx.conf /opt/bitnami/nginx/conf/server_blocks/ 

COPY --from=builder /usr/src/app/dist /app

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]