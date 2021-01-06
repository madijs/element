FROM node:10.16 as build-stage

RUN npm install npm@6.13.7 -g

RUN addgroup --system jotoro \
    && adduser --system --ingroup jotoro jotoro

ARG REGISTRY

WORKDIR  /app

COPY ./start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY package.json /app/

RUN npm cache clean --force

RUN npm install -S react
RUN npm install

COPY ./ /app/



RUN npm run build

COPY --chown=jotoro:jotoro . /app

USER jotoro


## Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.17.3-alpine
#
#COPY --from=build-stage /app/dist/ /usr/share/nginx/html
#COPY site.nginx.conf /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/nginx.conf

