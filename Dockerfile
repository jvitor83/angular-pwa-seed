# BUILD
FROM agileek/ionic-framework AS build
ARG registry=https://registry.npmjs.org/
ARG base_href=./
ARG target=production
LABEL Name=angular-pwa-seed Version=0.1.0

# Install
RUN npm uninstall -g ionic cordova
RUN npm install -g ionic@rc cordova
RUN npm config set registry ${registry}
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
COPY package.json /tmp/package.json
COPY config.xml /tmp/config.xml
RUN npm install -g --unsafe-perm concurrently mkdirp
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN cd /tmp && npm install --unsafe-perm && mv /tmp/node_modules /usr/src

COPY . /usr/src
WORKDIR /usr/src



# --------------------------------------
# Run Tests
# --------------------------------------
# RUN ng test --progress false --single-run

# --------------------------------------
# BUILD WEB
# --------------------------------------
RUN npm run build -- --base-href ${base_href} --target=${target}

# --------------------------------------
# BUILD ANDROID
# --------------------------------------
RUN npm run cordova -- build android --release
# docker cp angular-pwa-seed-container:/usr/src/platforms/android/build/outputs/apk/android-armv7-debug.apk .
# docker cp angular-pwa-seed-container:/usr/src/platforms/android/build/outputs/apk/android-x86-debug.apk .


# PUBLISH / RUN
FROM nginx AS publish
## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'build' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build /usr/src/www /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]


# TO RUN
# docker run -p 80:80 --name angular-pwa-seed-container --rm -i -t angular-pwa-seed bash
