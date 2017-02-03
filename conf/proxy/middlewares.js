'use strict';

var data;
var request = require('request');
var S = require('string');

/**
 * Execute http request
 * @param req Request
 * @param res Response
 * @param options Request options
 */
function executeRequest(req, res, options) {
  console.log("%s %s", req.method, options.uri);
  if (req.method === 'DELETE') {
    request.del(options).pipe(res);
  } else if (req.method === 'GET') {
    request.get(options).pipe(res);
  } else if (req.method === 'POST') {
    options.body = req.body;
    options.json = true;
    request.post(options).pipe(res);
  } else if (req.method === 'PUT') {
    options.body = req.body;
    options.json = true;
    request.put(options).pipe(res);
  }
}

module.exports = {
  // middleware functions should be listed here in reverse order to their
  // intended execution ex. C, B, A
  middlewares: [

    /**
     * Handle API service requests.
     * @param req Request
     * @param res Response
     * @param next Next
     */
    function (req, res, next) {
      // console.dir(res);
      console.info(req.method, req.url, req.method === 'POST' ? req.body : '');
      if (S(req.url).startsWith('/api/feedback/success')) {
        // SUCCEED
        res.end('OK');
      } else if (S(req.url).startsWith('/api/feedback/fail')) {
        // FAIL
        res.status(400).end('ERROR');
      } else if (S(req.url).startsWith('/api/feedback')) {
        res.end('OK');
      } else {
        next();
      }
    },

    /**
     * Get body data from POST, PUT request and add it to the request
     * object.
     * FIXME replace with connect body parser or equivalent
     * @param {Object} req Request
     * @param {Object} res Response
     * @param {Object} next Next
     */
    function (req, res, next) {
      if (req.method === 'POST' || req.method === 'PUT') {
        req.setEncoding('utf8');
        req.on('data', function (data) {
          req.body = JSON.parse(data);
          next();
        });
      } else {
        next();
      }
    }

  ]
};
