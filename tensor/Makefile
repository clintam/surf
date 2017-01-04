
all: image test lint

image:
	docker build -t prediction .

test: image
	docker run --rm prediction nosetests -vs tests

lint: image
	docker run --rm prediction ./pylint.sh

.PHONY: training_image run test