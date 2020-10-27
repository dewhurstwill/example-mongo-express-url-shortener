# example-mongo-express-url-shortener
An example URL Shortener built using MongoDB, ExpressJS &amp; ReactJS

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=dewhurstwill_example-mongo-express-url-shortener&metric=ncloc)](https://sonarcloud.io/dashboard?id=dewhurstwill_example-mongo-express-url-shortener)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=dewhurstwill_example-mongo-express-url-shortener&metric=bugs)](https://sonarcloud.io/dashboard?id=dewhurstwill_example-mongo-express-url-shortener)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=dewhurstwill_example-mongo-express-url-shortener&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=dewhurstwill_example-mongo-express-url-shortener)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=dewhurstwill_example-mongo-express-url-shortener&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=dewhurstwill_example-mongo-express-url-shortener)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=dewhurstwill_example-mongo-express-url-shortener&metric=security_rating)](https://sonarcloud.io/dashboard?id=dewhurstwill_example-mongo-express-url-shortener)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=dewhurstwill_example-mongo-express-url-shortener&metric=sqale_index)](https://sonarcloud.io/dashboard?id=dewhurstwill_example-mongo-express-url-shortener)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=dewhurstwill_example-mongo-express-url-shortener&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=dewhurstwill_example-mongo-express-url-shortener)

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
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
  * express-rate-limit is a basic rate-limiting middleware for Express

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
cd server
npm install
cd ../client
yarn install
npm run build
# Copy ./build to ../server/client/build
cd ../server/client/build
# Edit index.html
# Format HTML
# Copy the JavaScript script that isn't in an external file to /static/js/core.js
# ^ this is to avoid a frontend error 
# Replace the script with <script src="/static/js/core.js"></script>
# Set the MONGODB_URI to <mongo_server>/url-shortener
npm run start

```

## Development WebApp Server

```
npm run start
```

## Development Backend Server

```
npm run dev
```

## Example
[Example](https://short.wdew.uk)

## Hat-tip 🎩

Based-on create-react-app && create-express-api (https://www.npmjs.com/package/create-express-api) by CJ R. <cj@null.computer> (https://w3cj.now.sh)
