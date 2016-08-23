all: docker fvt lint

images:
	cd images && make

docker:
	docker build -t server ./

lint: docker
	docker run --rm server npm run lint --silent

up: docker
	docker-compose up -d
	docker-compose run --rm healthcheck

dev: docker
	docker-compose up

fvt: up
	docker-compose exec server npm run fvt --silent

down:
	docker-compose down -v

clean:
	rm -rf build/

.PHONY: images
