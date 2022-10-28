FROM node:16.14.2-alpine as build-stage      
RUN mkdir -p /app/
WORKDIR /app/
RUN chmod -R 777 /app/
COPY package*.json /app/
COPY tsconfig.json /app/
COPY tsconfig.node.json /app/
RUN npm i --legacy-peer-deps
COPY ./ /app/
RUN npm run build

FROM nginxinc/nginx-unprivileged 
#FROM bitnami/nginx:latest
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 80