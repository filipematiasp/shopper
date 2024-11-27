FROM node:16.14.2

RUN mkdir app

WORKDIR ./app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "start"]