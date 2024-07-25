FROM nginx:latest

RUN apt-get update && apt-get install -y curl

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80