Surfing CI-fari
===========
[![Build Status](https://travis-ci.org/clintam/surf.svg)](https://travis-ci.org/clintam/surf#)
***


A simple react/mongo stack managed with docker and make. 

#### Goals
* Modern and simple
* effecient dev cycles
* Support best CI practices
* Isomorphic codebase runs in server and clients

#### Quickstart

* Install Docker
* Build, test, bring up dev environment `make`

OR

* Install Nodejs, mongo, selenium, chrome, and ...
* Build with `npm install`
* Run with `npm run dev`

#### Make + Docker 

Simple Makefiles call out to docker and express the dependencies. 
Incremental-build optimizations are managed by docker/docker-compose.
This combination enables for effecient testing in paralell with `make -j`

* build base images
* build this image
* lint the source
* run unit tests
* startup FVT environment with mongo/webdriver
 * test REST API
 * test web UI
 

#### React

* prefer functional components

TODO: evaluation
