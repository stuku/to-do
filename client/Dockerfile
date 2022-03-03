FROM node:14.19-alpine3.15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]