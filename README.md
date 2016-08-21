
A simple nodejs/mongo stack managed with docker and make.

Goals:
* Modern and simple
* Quick dev cycles
* Isomorphic codebase runs in server and clients
* Supports effecient CI/CD practices

#### Development

* Install Docker
* Build and test in parallel `make -j`
* Live debug with `make debug` and attach editor to 5858. Make changes to code and it reloads.

OR 

* Install Nodejs
* Build with `npm install`
* Run with `npm run dev`
