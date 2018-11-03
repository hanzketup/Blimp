#!/bin/bash

cd "$(dirname "$0")"

git fetch --all
git checkout --force $1

docker-compose -f docker-compose.yml -f docker/production/docker-compose.prod.yml build

docker-compose down
docker-compose -f docker-compose.yml -f docker/production/docker-compose.prod.yml run django python manage.py makemigrations
docker-compose -f docker-compose.yml -f docker/production/docker-compose.prod.yml run django python manage.py migrate
docker-compose -f docker-compose.yml -f docker/production/docker-compose.prod.yml run django python manage.py collectstatic --noinput

docker-compose -f docker-compose.yml -f docker/production/docker-compose.prod.yml up -d

sleep 2
wget --retry --retry-connrefused http://localhost/debug/ok

echo "Deployment successful."