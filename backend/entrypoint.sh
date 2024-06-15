#!/bin/bash
set -e

rm -f /api/tmp/pids/server.pid

bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rake db:reset

exec "$@"