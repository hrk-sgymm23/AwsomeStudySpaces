FROM ruby:3.2.2

ARG RUBYGEMS_VERSION=3.4.6

RUN mkdir /app

WORKDIR /app

COPY ../../Gemfile /app/Gemfile
COPY ../../Gemfile.lock /app/Gemfile.lock

RUN gem update --system ${RUBYGEMS_VERSION} && \
    bundle install

COPY ../../ /app

VOLUME /app/public
VOLUME /app/tmp

EXPOSE 3000

COPY ./docker/staging/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]