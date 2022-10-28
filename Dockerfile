FROM node:18.0.0

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install --legacy-peer-deps

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]

EXPOSE 3000