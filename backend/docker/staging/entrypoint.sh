#!/bin/bash
set -e

# sudo service nginx start

# bundle exec rails db:create
bundle exec rake db:reset
bundle exec rails db:migrate

echo "puma start"

rm -f app/tmp/pids/server.pid
# bundle exec puma -C config/puma.rb

exec "$@"