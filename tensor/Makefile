
all: image test lint

image:
	docker build -t predictor .

test: image
	docker run --rm predictor nosetests -vs tests

lint: image
	docker run --rm predictor ./pylint.sh

.PHONY: training_image run test