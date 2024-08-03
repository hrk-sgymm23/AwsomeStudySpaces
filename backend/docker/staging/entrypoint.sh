#!/bin/bash
set -e

# sudo service nginx start

# bundle exec rails db:create
bundle exec rails db:migrate RAILS_ENV=staging
# bundle exec rails db:seed RAILS_ENV=staging
# bundle exec rake db:reset

echo "puma start"

rm -f app/tmp/pids/server.pid
# bundle exec puma -C config/puma.rb

exec "$@"