FROM node:alpine
RUN mkdir /server
WORKDIR /server
COPY package*.json /server
RUN npm install
COPY . /server
CMD npm start