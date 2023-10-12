var axios = require('axios');
var extend = require('extend');
var omit = require('object.omit');

var optionsDefault = {
  callback: null,
  waitForResponse: true
};

module.exports = function (url, opts) {

  var options = extend({}, optionsDefault, opts);

  return function (req, res, next) {
    var data = '';
    req.setEncoding('utf8');

    if (!req.rawBody) {
      req.on('data', chk => {
        data += chk;
      });
    }
    req.on('close', () => {
      //Build a parameter object for request

      if (!req.rawBody) {
        req.rawBody = data;
      }

      var params = extend({
        url,
        method: req.method,
        headers: { ...req.headers },
        data: req.rawBody
      }, omit(opts, Object.keys(optionsDefault)));

      if (params.headers) {
        delete params.headers['host'];
      }

      axios(params)
        .then(resp => {
          if (options.callback) {
            options.callback(null, resp);
          }

        })
        .catch(err => {
          if (options.callback) {
            options.callback(err);
          }

        })
        .finally(() => {
          if (options.waitForResponse) {
            next();
          }
        });
    });

    if (!options.waitForResponse) {
      next();
    }
  };
};
