const path = require('path');
const yargs = require('yargs');
const express = require('express');

// Get the arguments from npm command
const args = yargs
  .option('host', {
    alias: 'h',
    default: 'localhost'
  })
  .option('port', {
    alias: 'p',
    default: 8080
  })
  .argv;

// Create express server
const app = express();

// Origin URL
const origin = `http://${args.h}:${args.p}/`;

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

const requireFrom = (fp) => { // from path
  return (mp) => { // module path
    try {
      return require(path.normalize(`${__dirname}/${fp}/${mp}`));
    }
    catch (exception) {
      const msg = `require: The file "${mp}" could not be loaded`;
      console.error(new Error(msg));
      process.exit(0);
    }
  };
};

const generateRequestId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

const mockConfig = requireFrom('mock-config');
const mockData = requireFrom('mock-data');

let apiCount = 1;
mockConfig('index.json').modules.forEach((config, i) => {
  moduleMockConfig = mockConfig(`${config}.json`);
  console.log(`[Loading modules name...]: ${moduleMockConfig.name}`);
  moduleMockConfig.endPoints.forEach((endPoint, j) => {
    const method = endPoint.method || 'get',
      endPointPath = `/mock/${moduleMockConfig.modulePath}/${endPoint.path}`;

    console.log(`API ${apiCount++}: ${endPointPath}`);
    app[method](endPointPath, (req, res, next) => {
      let resp = {};
      if (typeof endPoint.responseData === 'string') {
        resp = mockData(`${config}/${endPoint.responseData}.json`);
      } else if (typeof endPoint.responseData === 'object'
        && !Array.isArray(endPoint.responseData)) {
        resp = endPoint.responseData;
      }

      if (endPoint.header) {
        res.setHeader(endPoint.header, endPoint.headerValue);
      }

      const status = endPoint.status || 200;
      const respDelay = endPoint.delay * 1000 || 0;
      const requestID = generateRequestId();

      console.log(`[RequestId: ${requestID}] PATH: ${endPoint.path}`);

      setTimeout(() => {
        res.status(status);
        res.json(resp);
        console.log(`[RequestId: ${requestID}] RESPONSE TIME: ${respDelay/1000}s`);
        res.end();
      }, respDelay);
    });
  });
});

// Listen the server
app.listen(args.p, () => {
  console.log('');
  console.log(`Mock server is running: ${origin}`);
});
