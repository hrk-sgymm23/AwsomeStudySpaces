FROM nginx:latest
# for health check
RUN apt-get update && apt-get install -y curl

ADD custom.conf /etc/nginx/conf.d

# CMD /usr/sbin/nginx -g 'daemon off;'
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80