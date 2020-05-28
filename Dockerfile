FROM node:latest

RUN mkdir -p /c/usr/src/app

WORKDIR /c/usr/src/app

RUN npm install -g nodemon

COPY package.json /c/usr/src/app

RUN npm install

COPY . /c/usr/src/app

EXPOSE 3000

CMD ["npm", "start"]