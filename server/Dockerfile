FROM node:alpine
RUN mkdir /server
WORKDIR /server
COPY package*.json /server
RUN npm install
COPY . /server
RUN chmod +x ./wait-for.sh
CMD ./wait-for.sh db:3306 -- npm start