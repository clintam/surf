Surfing CI-fari
===========
[![Build Status](https://travis-ci.org/clintam/surf.svg)](https://travis-ci.org/clintam/surf#)
***

A simple react/mongo/botkit stack managed with docker and make. Developer sanity is acheived via:

* Leveraging modern javascript (ES6)
* Effecient hot-swapping for live development cycles
* clean/isolated enviroments for dev and testing
* CI practics (linting, unit tests, and functional verification) 
* Isomorphic codebase: abstractions shared for REST APIs, web UX, and chat UX

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

* download/build base images (nodejs, mongo, webdriver)
* build server image
 * lint the source
 * run unit tests
 * startup FVT environment with our server plus mongo andwebdriver
  * test REST API
  * test web UI
 

#### React

* prefer functional components

TODO: evaluation

#### Chat UX

TODO

