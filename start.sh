#!/bin/bash

docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml down
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up $1

