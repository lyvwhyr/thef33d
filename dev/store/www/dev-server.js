'use strict';

const http     = require('http'),
  fs           = require('fs'),
  path         = require('path'),
  contentTypes = require('./content-types'),
  env          = process.env;

let server = http.createServer(function (req, res) {
  let url = req.url;
  if (url == '/') {
    url += 'index.html';
  }

  fs.readFile('./src' + url, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      let ext = path.extname(url).slice(1);
      let contentType = contentTypes[ext] || 'text/plain';
      res.setHeader('Content-Type', contentType);
      //if (ext === 'html') {
        res.setHeader('Cache-Control', 'no-cache, no-store');
      //}
      res.end(data);
    }
  });
});

server.listen(3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
