FROM ruby:3.2.2

ARG RUBYGEMS_VERSION=3.4.6

RUN mkdir /app

WORKDIR /app

COPY ../../Gemfile /app/Gemfile
COPY ../../Gemfile.lock /app/Gemfile.lock

RUN gem update --system ${RUBYGEMS_VERSION} && \
    bundle install

COPY ../../ /app

# CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]

# CMD ["rails", "server", "-b", "0.0.0.0"]
VOLUME /app/public
VOLUME /app/tmp

EXPOSE 3000

# CMD bash -c "rm -f tmp/pids/server.pid && bundle exec puma -C config/puma.rb"
# CMD /bin/sh -c "rm -f tmp/pids/server.pid && bundle exec puma -C config/puma.rb"
COPY ./entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]