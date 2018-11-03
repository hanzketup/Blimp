FROM node:8

ADD . /code
WORKDIR /code

RUN yarn add package.json
ENV NODE_ENV=development

STOPSIGNAL SIGINT
ENTRYPOINT ["yarn"]
CMD ["start"]
