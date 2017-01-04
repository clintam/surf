IMAGE_NAME = server
RUN_DOCKER = docker run -t --rm ${IMAGE_NAME} npm run $(1) --silent
RUN_DOCKER_COMPOSE = docker-compose -f ../docker-compose.yml run --rm --name $(1) ${IMAGE_NAME} npm run $(1) --silent

all: image test

image:
	docker build -t ${IMAGE_NAME} .

test: unit-test lint

lint: image
	$(call RUN_DOCKER,lint)

unit-test: image
	$(call RUN_DOCKER,test)

fvt: server-fvt web-fvt

server-fvt:
	$(call RUN_DOCKER_COMPOSE,server-fvt)

web-fvt:
	$(call RUN_DOCKER_COMPOSE,web-fvt)

chatbot-fvt:
	$(call RUN_DOCKER_COMPOSE,chatbot-fvt)

.PHONY: image
