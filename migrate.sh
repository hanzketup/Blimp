#!/bin/bash

docker exec docker_django_1 python manage.py makemigrations --no-input
docker exec docker_django_1 python manage.py migrate --no-input

