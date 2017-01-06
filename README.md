Sentiment Surfer
===========
[![Build Status](https://travis-ci.org/clintam/surf.svg)](https://travis-ci.org/clintam/surf#)
***


#### Application

Meet the sentiment surfer, the bot that surfs the web and provides sentiment analysis. 
Tell it about some websites, and a bot will visit them for you. Phrases from each site are extracted (via CSS selector)
and the results are feed into a machine learning model to predict sentiment of the phrase.
The website phrases and sentiments are expsoed in a web ui as well as a (slack) chatbot. 

![Demo](https://raw.githubusercontent.com/clintam/surf/master/demo.gif "Demo screen capture")

### Dev guide

A polyglot stack:
 * javascript backend and frontend with nodejs react, socket.io, botkit, and mongo. 
 * python backend with tensorflow and flask 
 
Infrastructure is managed with docker and make. 

Tech bling:
* Real time updates with websockets
* A chat interface (slack)
* Isomorphic javascript: same code used in server and browser
* Tensorflow

Developer sanity is achieved via:
* Leveraging modern javascript (ES6)
* Efficient hot-swapping for live development cycles
* Reproducible, isolated environments for dev and testing
* CI practices (linting, unit tests, and functional verification) 

#### Quickstart

* Install Docker
* Build, bring up dev environment `make dev` 

OR

* Install Nodejs, mongo, selenium, chrome, python, tensorflow, and ...
* Build/run js server `cd js && npm install && npm run dev`
* Build/run python server `cd tensor && pip --install < requirements.text && ./main.py`


#### Make + Docker 

Simple Makefiles call out to Docker and express the order dependencies. 
Incremental-build optimizations are managed by docker/docker-compose.
This combination enables to run a parallel build with `make -j`

* download/build base images (nodejs, mongo, webdriver)
* build js server image
 * lint 
 * tests
* build pythone server image
 * lint
 * test
* startup FVT environment with our server plus mongo and webdriver
 * test REST API
 * test web UI
 * test chat UI
 * (TODO) test prediction 
 

## Reflections

#### React

Approach:
* prefer functional abstractions
* Views consist of: components and containers:
 * components are pure functions props -> DOM
 * containers group components mapping state -> props

Evaluation:
* Functional UI programming is great (Tony the tiger)!
 * views, reducers can be pure functions
 * most side-effects (AJAX) happens in actions
* enforcing a separation between view and state manipulation is "firm but fair"
* JSX seems nice
* Subjectivly seems more "clunky/slow" than angular 


#### Chat UX

Bots test bots! FVT by using another bot to drive conversation with our chat UX bot

Note: running chat FVT tests require some configuration:
* Create two bots in your team and export the tokens
in SLACK_TOKEN and TEST_SLACK_TOKEN
* create a room called "testing"
* invite both bots to the room   


#### Tensorflow

Powerful abstractions, lots of examples.

Tensorflow server looks like great concept to improov perfomance. However, seems like not quite ready for "general" use.
Need to build from source, no binary releases (even for the python library to call over protobuf).
