
all: training_image serving_image test

training_image:
	docker build -t tensor_training .

serving_image:
	docker build -t tensor_serving -f Dockerfile.serving .

test: image
	docker run --rm tensor_training nosetests -vs tests

.PHONY: image run test