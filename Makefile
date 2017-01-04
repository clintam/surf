IMAGE_NAME = server
RUN_DOCKER = docker run -t --rm ${IMAGE_NAME} npm run $(1) --silent
RUN_DOCKER_COMPOSE = docker-compose run --rm --name $(1) ${IMAGE_NAME} npm run $(1) --silent

all: js_image tensor_image fvt

base_images/%.image:
	docker build -t $* base_images/$*

js_image: base_images/nodejs.image
	make -C js

tensor_image: base_images/tensorflow.image
	make -C tensor

docker_compose_images: image base_images/wait-for-http.image base_images/webdriver.image

up: docker_compose_images
	mkdir -p images
	docker-compose up -d
	docker-compose run --rm healthcheck

dev: up
	docker-compose logs -f --tail=10 server

fvt: up
	make -C js fvt

down:
	docker-compose down -v

dev-clean:
	docker-compose kill server
	docker-compose rm -fv server

docker-clean:
	docker ps -q -f status=exited | xargs --no-run-if-empty docker rm 
	docker volume ls -qf dangling=true |  xargs --no-run-if-empty docker volume rm 
	docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi

clean: down

.PHONY: image
