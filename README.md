# Example of using Toxi Proxy and Cypress

# Running 
`npm run all` starts everthing but toxicproxy

`npm run api` will run a simple mock webserver that on the url http://localhost:3333 and return a list of data.

`npm run start` will run a simple react app.

`npm run cypress` will run the e2e tests.

Toxiproxy server must be running.

The tests show how to spin up a proxy for our webserver before each test and them add toxicities to the proxy.

This uses a custom built plugin which is still a work in progress