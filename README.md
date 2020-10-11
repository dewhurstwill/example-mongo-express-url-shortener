# example-mongo-express-url-shortener
An example URL Shortener built using MongoDB, ExpressJS &amp; ReactJS

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [@hapi/joi](https://www.npmjs.com/package/@hapi/joi)
  * Joi is a powerful schema description language and data validator for JavaScript
* [monk](https://www.npmjs.com/package/monk)
  * Monk is middleware used for consuming MongoDB within Node.JS
* [nanoid](https://www.npmjs.com/package/nanoid)
  * NanoId is a tiny, secure, URL-friendly, unique string ID generator for JavaScript


Development utilities:

* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [mocha](https://www.npmjs.com/package/mocha)
  * ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Development

```
npm run dev
```

## TODO

- Finalise backend
- Build simple frontend

## Hat-tip 🎩

Based-on create-express-api (https://www.npmjs.com/package/create-express-api) by CJ R. <cj@null.computer> (https://w3cj.now.sh)
