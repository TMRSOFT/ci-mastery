# ci-mastery

A continuous integration example using Mongodb, NodeJs with ExpressJs framework, Mochajs and Jenkins as CI

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for Development or Production environment.

### Prerequisites

What things you need to install the software and how to install them.

* Install [NodeJS](https://nodejs.org)

That's all! :D

### Installing

A step by step series of examples that tell you have to get a Development or Production env. running.

* Clone the project to your local computer.
* Inside the project folder, open a command prompt and write:
```
npm install
```
* Then if you want to start in Development mode, write:
```
npm start
```
* Or if you want to start in Production mode in Windows, write:
```
npm run production_win
```
* To run Production mode in Linux, write:
```
npm run production_lin
```
* And the server will start running at [Localhost](http://localhost:9000) listening to port 9000.

### Tests

* Inside the project folder, open a command prompt and write
```
npm test
```

### Code documentation

* Go to [Localhost/wiki](http://localhost:9000/wiki) after deployment with Jenkins. Or run:
```
jsdoc .\routes\person.js .\models\person.js .\models\connection.js -d public/wiki
```

## Authors

* **Luis Daniel** - *Developer*
* **Alejandro Cabrera** - *Developer*

## License

This project is licensed under the Apache License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

* NodeJS
* ExpressJS
* Mongodb
* Mochajs
* Jenkins
* Blue Ocean
* Google JavaScript Style Guide
* Videogame gods
