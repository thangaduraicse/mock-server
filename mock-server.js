const fs = require('fs');
const mockData = require('./data');

const readJSONFileSync = (filePath, encoding) => {
  encoding = encoding && "utf8";
  const file = fs.readFileSync(filePath, encoding);
  return JSON.parse(file);
};

const url = (moduleKey, pathName) => `/${moduleKey}/${pathName}`;

const requestHandler = (app, moduleKey, moduleObj) => {
  if (!moduleObj || !moduleKey) return;
  const mockUrl = url(moduleKey, moduleObj.pathName);
  // const responseJSON = readJSONFileSync(moduleObj.content);
  const responseJSON = {
    'test': 'I am working'
  };

  app.get(mockUrl, (req, res, next) => {
    res.json(responseJSON);
  });
  app.put(mockUrl, (req, res, next) => {
    next(new Error(`PUT method for ${mockUrl} is not implemented`));
  });
  app.post(mockUrl, (req, res, next) => {
    next(new Error(`POST method for ${mockUrl} is not implemented`));
  });
  app.delete(mockUrl, (req, res, next) => {
    next(new Error(`DELETE method for ${mockUrl} is not implemented`));
  });
};

module.exports = (app) => {
  Object.keys(mockData).forEach(eachModule => {
    mockData[eachModule].map(moduleObj => 
      requestHandler(app, eachModule, moduleObj));
  });
  return true;
};
