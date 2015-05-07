'use strict';

module.exports = {
  registerAsset: require('./register-asset'),
  registerFunction: require('./register-function'),
  registerModule: require('./register-module'),
  registerFiles: require('./register-files'),
  registerInstance: require('./register-instance'),
  registerHash: require('./register-hash'),
  register: require('./register'),

  resolve: require('./resolve'),
  resolveAsset: require('./resolve-asset'),
  invoke: require('./invoke'),

  remove: require('./remove')
};
