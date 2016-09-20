Surfing CI-fari
===========
[![Build Status](https://travis-ci.org/clintam/surf.svg)](https://travis-ci.org/clintam/surf#)
***


#### Application

Meet surfbot, the bot that surfs the web so you don't have to.
Tell it about some websites, and a bot will visit them for you. 
Important bits of the website are presented in a web ui as well as a (slack) chatbot. 

[[https://raw.githubusercontent.com/clintam/surf/master/demo.gif]]

### Dev guide

A sweet nodejs stack using mongo, react, socket.io, and botkit. 
Infrastructure is managed with docker and make. 

Pretty basic functionality, but built with some tech bling:
* Real time updates with websockets
* A chat interface (slack)
* Isomorphic javascript: same web client used in server and browser

Developer sanity is achieved via:
* Leveraging modern javascript (ES6)
* Efficient hot-swapping for live development cycles
* Reproducible, isolated environments for dev and testing
* CI practices (linting, unit tests, and functional verification) 

#### Quickstart

* Install Docker
* Build, bring up dev environment `make dev` 

OR

* Install Nodejs, mongo, selenium, chrome, and ...
* Build with `npm install`
* Run with `npm run dev`


#### Make + Docker 

Simple Makefiles call out to Docker and express the dependencies. 
Incremental-build optimizations are managed by docker/docker-compose.
This combination enables to run a parallel build with `make -j`

* download/build base images (nodejs, mongo, webdriver)
* build server image
 * lint the source
 * run unit tests
 * startup FVT environment with our server plus mongo and webdriver
  * test REST API
  * test web UI
  * test chat UI
 
 NOTES:
 * seem to leak disk with dev process. Using `make docker-clean` to fix

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


#### Chat UX

Bots test bots! FVT by using another bot to drive conversation with our chat UX bot

Note: running chat FVT tests require some configuration:
* Create two bots in your team and export the tokens
in SLACK_TOKEN and TEST_SLACK_TOKEN
* create a room called "testing"
* invite both bots to the room   
