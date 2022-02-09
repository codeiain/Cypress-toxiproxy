/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const rp = require("request-promise-native");
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    async "toxiproxy:createProxy"({ host, body }) {
      console.log('%s, %s', host, body)
      debugger;
      let res = await rp.post({
        body: JSON.parse(body),
        json: true,
        url: host + "/proxies",
        headers: {
          'User-Agent': 'PostmanRuntime/7.28.1'
        }
      });
      return res;
    },
    async "toxiproxy:ProxyDown"({ host, proxyName }) {
      console.log('%s, %s', host, proxyName)
      debugger;
      let body ={
        enabled: false
      }
      let res = await rp.post({
        body: body,
        json: true,
        url: host + "/proxies/"+proxyName,
        headers: {
          'User-Agent': 'PostmanRuntime/7.28.1'
        }
      });
      return res;
    },
    async "toxiproxy:ProxyUp"({ host, proxyName }) {
      console.log('%s, %s', host, proxyName)
      debugger;
      let body ={
        enabled: true
      }
      let res = await rp.post({
        body: body,
        json: true,
        url: host + "/proxies/"+proxyName,
        headers: {
          'User-Agent': 'PostmanRuntime/7.28.1'
        }
      });
      return res;
    },

    async "toxiproxy:addToxic"({ host, proxyName, details }) {
      // POST /proxies/{proxy}/toxics
      let res = await rp.post({
        body: JSON.parse(details),
        json: true,
        url: host + "/proxies/" + proxyName + "/toxics",
        headers: {
          'User-Agent': 'PostmanRuntime/7.28.1'
        }
      });
      return res;
    },
    async "toxiproxy:removeToxic"({ host, proxyName, toxisName }) {
      // DELETE /proxies/{proxy}/toxics/{toxic}
      let res = await rp.delete({
        url: host + "/proxies/" + proxyName + "/toxics/" + toxisName,
        headers: {
          'User-Agent': 'PostmanRuntime/7.28.1'
        }
      });
      return res
    },
    async "toxiproxy:destroyProxy"({ host, name }) {
      let res = await rp.delete({
        url: host + "/proxies/" + name,
        headers: {
          'User-Agent': 'PostmanRuntime/7.28.1'
        }
      });
      return res
    }
  })
}
