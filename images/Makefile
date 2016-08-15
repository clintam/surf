all: nodejs.docker wait-for-http.docker

%.docker:
	docker build -t $* $*