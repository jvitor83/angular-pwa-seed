
FROM node:latest
ARG registry=https://registry.npmjs.org/
LABEL Name=angular-pwa-seed Version=0.1.0 
COPY package.json /tmp/package.json
RUN npm config set registry ${registry}
RUN cd /tmp && npm i -g --unsafe-perm @angular/cli cordova ionic@beta typescript sleep-ms concurrently mkdirp && npm install --unsafe-perm
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 5555
# CMD npm run start


# TO RUN
# docker run -p 5555:5555 --name angular-pwa-seed-container --rm -i -t angular-pwa-seed bash
