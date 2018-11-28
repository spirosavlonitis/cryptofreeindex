FROM node:11

LABEL "maintainer"="<spirosavlonitis1984@gmail.com>"
LABEL "app-name"="cryptofreeindex"

USER root

ENV APP /data/cryptofreeidex

RUN apt-get update -y

ADD . $APP/

WORKDIR $APP

RUN npm install

CMD ["yarn", "start"]
