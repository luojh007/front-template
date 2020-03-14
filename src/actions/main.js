'use strict';

import request from '../core/_utils/request';

module.exports = {
  common: (source) => {
    return async (dispatch, getState) => {
      let results = await request();
      return results;
    }
  },
};
