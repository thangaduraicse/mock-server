const path = require('path');

const fromPath = (fromPath) => {
  return (modulePath) => {
    return path.normalize(`${__dirname}/../../${fromPath}/${modulePath}`);
  }
}

const module1Path = fromPath('data/module1');
const module2Path = fromPath('data/module2');

module.exports = {
  module1: [
    {
      content: module1Path('stocks.json'),
      pathName: 'stocks'
    },
    {
      content: module1Path('zips.json'),
      pathName: 'zips'
    }
  ],
  module2: [
    {
      content: module2Path('enron.json'),
      pathName: 'enron'
    },
    {
      content: module2Path('world_bank.json'),
      pathName: 'world-bank'
    }
  ]
};
