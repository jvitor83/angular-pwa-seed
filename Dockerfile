
FROM node:latest
ARG registry=https://registry.npmjs.org/
LABEL Name=angular-pwa-seed Version=0.1.0
COPY package.json /tmp/package.json
COPY config.xml /tmp/config.xml
RUN npm config set registry ${registry}
RUN yarn config set registry ${registry}
RUN yarn global add @angular/cli cordova@6.5.0 ionic typescript sleep-ms concurrently mkdirp
RUN cd /tmp && yarn install
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 5555
# CMD npm run start


# TO RUN
# docker run -p 5555:5555 --name angular-pwa-seed-container --rm -i -t angular-pwa-seed bash
