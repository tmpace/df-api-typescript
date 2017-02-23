FROM node:6.1

ADD . /app

RUN cd /app  \
    && npm install --silent -g typescript \
    && npm install --silent

# RUN cd /app ls

RUN cd /app \
    && tsc

EXPOSE 8000

CMD ["node", "/app/dist/index.js"]
