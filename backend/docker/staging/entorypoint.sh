#!/bin/bash
set -e

# sudo service nginx start
rm -f /api/tmp/pids/server.pid

# bundle exec rails db:create
# bundle exec rails db:migrate RAILS_ENV=staging
# bundle exec rails db:seed RAILS_ENV=staging
# bundle exec rake db:reset


exec "$@"