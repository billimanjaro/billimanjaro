# billimanjaro
A nodejs based billing system

[![Build Status](https://img.shields.io/travis/billimanjaro/billimanjaro.svg)](https://travis-ci.org/billimanjaro/billimanjaro)
[![Dependency Status](https://img.shields.io/david/billimanjaro/billimanjaro.svg)](https://david-dm.org/billimanjaro/billamanjaro)
[![Coverage](https://img.shields.io/coveralls/billimanjaro/billimanjaro.svg)](https://coveralls.io/r/billimanjaro/billimanjaro)

## Requirements
- Node.js v0.12.x, IO.js (any version)

## Getting started
After cloning the repository, run `npm install`. That's it.

## Starting the servers
Simple: `npm start`.

## Viewing the things
After starting the servers, you can view the account zone by going to http://localhost:8080, the admin zone by going to
http://localhost:8081, and you can access the API by going to http://localhost:8082.

## Debugging:
Again, simple: `NODE_DEBUG=master,api,admin,account npm start`.

## Running the tests
Also simple: `npm test`.

## Versions
This package uses both package.json and .nvmrc to enforce engine versions. You can save yourself a lot of effort by using [`nvm`](https://github.com/creationix/nvm).

## Contributing
Please fork this repository and submit your change as a pull request. Also note that we can't accept a pull request with failing
tests, or a lack of tests. This keeps the code quality high, while simultaneously making code review easier.
