IMAGE_NAME = server
RUN_DOCKER = docker run -t --rm ${IMAGE_NAME} npm run $(1) --silent
RUN_DOCKER_COMPOSE = docker-compose run --rm --name $(1) ${IMAGE_NAME} npm run $(1) --silent

all: image all-tests lint

base_images/%.image:
	docker build -t $* base_images/$*

image: base_images/nodejs.image
	docker build -t ${IMAGE_NAME} .

lint: image
	$(call RUN_DOCKER,lint)

test: image
	$(call RUN_DOCKER,test)

docker_compose_images: image base_images/wait-for-http.image base_images/webdriver.image

up: docker_compose_images
	docker-compose up -d
	docker-compose run --rm healthcheck

dev: up
	docker-compose logs -f --tail=10

all-tests: test server-fvt web-fvt chatbot-fvt

server-fvt: up
	$(call RUN_DOCKER_COMPOSE,server-fvt)

web-fvt: up
	$(call RUN_DOCKER_COMPOSE,web-fvt)

chatbot-fvt: up
	$(call RUN_DOCKER_COMPOSE,chatbot-fvt)

down:
	docker-compose down -v

clean: down
	rm -rf build
	mkdir build

.PHONY: image
