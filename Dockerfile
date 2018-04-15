# BUILD
FROM beevelop/ionic AS build
ARG registry=https://registry.npmjs.org/
ARG base-href=./
ARG target=production
LABEL Name=angular-pwa-seed Version=0.1.0
# RUN npm uninstall -g ionic cordova
RUN npm config set registry ${registry}
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
COPY package.json /tmp/package.json
COPY config.xml /tmp/config.xml
RUN npm install -g --unsafe-perm concurrently mkdirp
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN cd /tmp && npm install --unsafe-perm && mv /tmp/node_modules /usr/src
# RUN npm install && mkdir /ng-app && cp -R ./node_modules ./ng-app
COPY . /usr/src
WORKDIR /usr/src



# --------------------------------------
# Run Tests
# --------------------------------------
# RUN ng test --progress false --single-run


RUN npm run build -- --base-href ${base-href} --target=${target}
# RUN npm run resources
# RUN npm run install.android
# RUN npm run cordova build android --release

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
