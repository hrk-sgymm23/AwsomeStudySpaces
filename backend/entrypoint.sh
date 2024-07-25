#!/bin/bash
set -e

# rm /api/tmp/pids/server.pid
# bundle exec rails server -b 0.0.0.0 -p 3000

# bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails db:seed
# bundle exec rake db:reset

exec "$@"