'use strict';
const memoize = require('lodash/function/memoize');
const http = require('http');
const React = require('react');
const ReactDOM = require('react-dom/server');

// get PORT to use
const PORT = process.env.PORT || 3333;

// memoize path to make component path
const makePath = memoize(component => process.cwd() + component);

// create a HTTP server
http
.createServer()
.on('request', (request, response) => {
  if (request.method !== 'POST') {
    // if the request isn't a POST then response with invalid method
    response.writeHead(405, {
      'Content-Length': 33,
      'Content-Type': 'application/json',
    })
    response.end('{"message":"Invalid HTTP method"}');
  }

  // body variable to save data
  let body = '';

  // listen request data event
  request
  // save data as the body
  .on('data', data => body += data)
  // listen request end event
  .on('end', () => {
    try {
      // get component and props from POST body
      const data = JSON.parse(body);
      //console.log(data);
      const component = data.component;
      const props = data.props ? data.props : {};
 // define the component absolute path
      const componentPath = makePath(component);

      // create a react's component factory
      const Component = React.createFactory(require(componentPath));

      // render react component as string
      const html = ReactDOM.renderToString(Component(props));
      // set status code and header
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });

      // send date
      response.sendDate = true;

      // write and end response
      return response.end(html, 'utf-8');
    } catch(error) {
      console.error(error);

      const message = `{"message":"${error.message}"}`;

      response.writeHead(400, {
        'Content-Length': message.length,
        'Content-Type': 'application/json'
      });

      return response.end(message, 'utf-8');
    }
  });
})
.listen(PORT, () => {
  return process.stdout.write(`Server listening port ${PORT}
`)
});