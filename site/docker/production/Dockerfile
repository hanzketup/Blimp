FROM node:8

ADD . /code
WORKDIR /code

RUN yarn add package.json
ENV NODE_ENV=production

STOPSIGNAL SIGINT
ENTRYPOINT ["yarn"]
CMD ["build"]
