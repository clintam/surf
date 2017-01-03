
all: image test

image:
	docker build -t prediction .

test: image
	docker run --rm prediction nosetests -vs tests

.PHONY: training_image run test