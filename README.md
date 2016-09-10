Surfing CI-fari
===========
[![Build Status](https://travis-ci.org/clintam/surf.svg)](https://travis-ci.org/clintam/surf#)
***

A sweet nodejs stack using mongo, react, socket.io, and botkit. 
Infrastructure is managed with docker and make. 

Developer sanity is achieved via:
* Leveraging modern javascript (ES6)
* Efficient hot-swapping for live development cycles
* Reproducible, isolated environments for dev and testing
* CI practices (linting, unit tests, and functional verification) 
* Isomorphic codebase: abstractions shared for REST APIs, web UX, and chat UX

#### Application

YATL (yet another todo list), but with some tech bling:
* Real time updates with websockets
* A chat interface (slack)

#### Quickstart

* Install Docker
* Build, test, bring up dev environment `make`

OR

* Install Nodejs, mongo, selenium, chrome, and ...
* Build with `npm install`
* Run with `npm run dev`

#### Make + Docker 

Simple Makefiles call out to Docker and express the dependencies. 
Incremental-build optimizations are managed by docker/docker-compose.
This combination enables for efficient testing in parallel with `make -j`

* download/build base images (nodejs, mongo, webdriver)
* build server image
 * lint the source
 * run unit tests
 * startup FVT environment with our server plus mongo and webdriver
  * test REST API
  * test web UI
  * test chat UI
 

#### React


Setup
* prefer functional abstractions
* Views consist of: components and containers:
 * components are pure functions props -> DOM
 * containers group components mapping state -> props

Evaluation
* Functional UI programming is great (Tony the tiger)!
 * views, reducers can be pure functions
 * most side-effects (AJAX) happens in actions
* enforcing a separation between view and state manipulation is "firm but fair"
* JSX seems nice
* TODO: Reducer eval. Is it tedious? 


Notes: re-wiring action to get live editing w/websocket was a 10-liner 
https://github.com/clintam/surf/commit/25417a55ec115094875d5740ddc6f26683a8e2d0

#### Chat UX

Bots test bots! FVT by using another bot to drive conversation with our chat UX bot

