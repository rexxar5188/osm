FROM node:10.16.3-alpine
LABEL maintainer="yangshuo@si-tech.com.cn"

RUN mkdir /osm_ui
WORKDIR /osm_ui
COPY . /osm_ui
RUN apk update && apk add --no-cache nginx=1.14.2-r4

COPY nginx-app.conf /etc/nginx/nginx.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx
RUN npm install

EXPOSE 80

