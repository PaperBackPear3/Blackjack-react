docker-compose -f docker-compose.yml build --no-cache

##COMPOSE UP
echo "Starting up containers..."

docker-compose -f docker-compose.yml up
echo "Shutting down containers..."
docker-compose down
#removes everything
echo "Removing unused Images..."

docker image prune --force --all