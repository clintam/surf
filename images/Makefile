all: nodejs.docker wait-for-http.docker webdriver.docker

%.docker:
	docker build -t $* $*