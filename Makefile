IMAGE_NAME = server
RUN_DOCKER = docker run -t --rm ${IMAGE_NAME} npm run $(1) --silent
RUN_DOCKER_COMPOSE = docker-compose run --rm --name $(1) ${IMAGE_NAME} npm run $(1) --silent

all: image all-tests lint tensor_images

base_images/%.image:
	docker build -t $* base_images/$*

image: base_images/nodejs.image
	docker build -t ${IMAGE_NAME} .

tensor_images: base_images/tensorflow.image
	make -C tensor

lint: image
	$(call RUN_DOCKER,lint)

test: image
	$(call RUN_DOCKER,test)

docker_compose_images: image base_images/wait-for-http.image base_images/webdriver.image

up: docker_compose_images
	mkdir -p images
	docker-compose up -d
	docker-compose run --rm healthcheck

dev: up
	docker-compose logs -f --tail=10 server

all-tests: test server-fvt web-fvt chatbot-fvt

server-fvt: up
	$(call RUN_DOCKER_COMPOSE,server-fvt)

web-fvt: up
	$(call RUN_DOCKER_COMPOSE,web-fvt)

chatbot-fvt: up
	$(call RUN_DOCKER_COMPOSE,chatbot-fvt)

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
