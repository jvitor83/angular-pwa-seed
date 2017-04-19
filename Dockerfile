
FROM node:6
LABEL Name=angular-pwa-seed Version=0.1.0 
COPY package.json /tmp/package.json
#RUN cd /tmp && npm install --unsafe-perm -g @angular/cli cordova ionic@beta typescript sleep-ms concurrently mkdirp
RUN cd /tmp && npm install --unsafe-perm
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 5555
CMD npm run start
