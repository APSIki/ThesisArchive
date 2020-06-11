#!/bin/bash
set -e

echo "===Pull & Run postgres container"
docker run --rm --name pg-docker -e POSTGRES_USER=user -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v c:/Docker/postgres  postgres:11

echo "===Copy SQL DB scheme to postgres container"
docker cp final.SQL pg-docker:/final.SQL

echo "===Waiting for database up"
sleep 5s

winpty docker exec -it pg-docker psql -U user -c 'create database thesis_db;'

winpty docker exec -it pg-docker psql -U user -c 'grant all privileges on database "thesis_db" to "user";'

echo "===Run SQL scheme"
winpty docker exec -it pg-docker psql -U user -d thesis_db -f final.SQL
