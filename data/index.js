const path = require('path');

const fromPath = (fromPath) => {
  return (modulePath) => {
    return path.normalize(`${__dirname}/../../${fromPath}/${modulePath}`);
  }
}

const module1Path = fromPath('data/module1');
const module2Path = fromPath('data/module2');

const data = {
  module1: [
    {
      content: module1Path('stocks.json'),
      path: '/stocks'
    },
    {
      content: module1Path('zips.json'),
      path: '/zips'
    }
  ],
  module2: [
    {
      content: module2Path('enron.json'),
      path: '/enron'
    },
    {
      content: module2Path('world_bank.json'),
      path: '/world-bank'
    }
  ]
};

export default data;
