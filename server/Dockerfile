FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 49170

# You can change this
CMD [ "npm", "run", "dev" ]