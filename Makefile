all: docker test lint

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

test: fvt ui-fvt

fvt: up
	docker-compose run --rm --name fvt server npm run fvt --silent

ui-fvt: up
	docker-compose run --rm --name ui-fvt server npm run ui-fvt --silent

down:
	docker-compose down -v

clean:
	rm -rf build/

.PHONY: images
