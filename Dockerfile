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
# When the image is running 'npm run docker.run' them you can copy the APKs using the commands bellow or just by downloading the APKs at 'http://localhost/android/android-x86-debug.apk'
# docker cp angular-pwa-seed-container:/usr/share/nginx/html/android/android-armv7-debug.apk .
# docker cp angular-pwa-seed-container:/usr/share/nginx/html/android/android-x86-debug.apk .


# PUBLISH / RUN
FROM nginx AS publish
## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'build' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build /usr/src/www /usr/share/nginx/html
# Copy the APKs generated, to the running image (allow to download the APK at url: 'http://localhost/android/android-x86-debug.apk')
COPY --from=build /usr/src/platforms/android/build/outputs/apk /usr/share/nginx/html/android
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]


# TO RUN
# docker run -p 80:80 -p 443:443 --name angular-pwa-seed-container --rm -i -t angular-pwa-seed bash
