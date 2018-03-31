FROM teracy/angular-cli

MAINTAINER hoatle <hoatle@teracy.com>

# pattern YYYMMDD:HHMMSS
# update this when we want to rebuild the image, for example, to update npm modules
ENV REFRESHED_AT 20160922:000000

ENV HOME=/usr/src/app

RUN mkdir $HOME 

COPY package.json $HOME/

WORKDIR $HOME

RUN rm -rf node_modules && npm install && npm cache verify && rm -rf ~/.npm
CMD ping localhost