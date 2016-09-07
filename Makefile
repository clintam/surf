all: docker all-tests lint

images:
	cd images && make

docker:
	docker build -t server ./

lint: docker
	docker run -t --rm server npm run lint --silent

up: docker
	docker-compose up -d
	docker-compose run --rm healthcheck

dev: up
	docker-compose logs -f --tail=0

all-tests: test fvt ui-fvt

test: docker
	docker run -t --rm server npm run test --silent

fvt: up
	docker-compose run --rm --name fvt server npm run fvt --silent

ui-fvt: up
	docker-compose run --rm --name ui-fvt server npm run ui-fvt --silent

down:
	docker-compose down -v

clean: down
	rm -rfv build
	mkdir build

.PHONY: images
