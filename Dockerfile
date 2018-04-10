
FROM beevelop/ionic AS build
ARG registry=https://registry.npmjs.org/
LABEL Name=angular-pwa-seed Version=0.1.0
WORKDIR /usr/src/app
RUN npm config set registry ${registry}
RUN npm uninstall -g ionic cordova
RUN npm install -g --unsafe-perm @angular/cli@1.7.1 cordova@6.5.0 ionic@2.2.3 typescript sleep-ms concurrently mkdirp
COPY . .
RUN npm install --silent
RUN npm run build.prod.exp
# RUN npm run resources
# RUN npm run install.android
# RUN npm run cordova build android --release


FROM nginx AS publish
COPY --from=build /usr/src/app/www /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g"]
CMD ["daemon off;"]


# TO RUN
# docker run -p 80:80 --name angular-pwa-seed-container --rm -i -t angular-pwa-seed bash
