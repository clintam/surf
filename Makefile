all: docker fvt

images:
	cd images && make

docker:
	docker build -t server ./

up: docker
	docker-compose up -d
	docker-compose run wait

dev: docker
	docker-compose up

fvt: up
	docker-compose exec server npm run fvt

down:
	docker-compose down -v

clean:
	rm -rf build/

.PHONY: images
