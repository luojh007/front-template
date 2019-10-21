'use strict';

const configActions = require('./config');
const mainActions = require('./main');
const commonActions = require('./common');
// const courseWareActions = require('./courseWare');

module.exports = {
  ...configActions,
  ...mainActions,
  ...commonActions,
  // ...courseWareActions,
};
