import config from '../config';

class Console {
  getCatalogFrameUrl() {
    return config.localdev
      ? config.devCatalogUrl
      : 'https://catalog.' + config.domain;
  }

  getInstancesFrameUrl() {
    return config.localdev
      ? config.devInstancesUrl
      : 'https://instances.' + config.domain;
  }

  getLambdasFrameUrl() {
    return config.localdev
      ? config.devLambdasUrl
      : 'https://lambdas-ui.' + config.domain;
  }

  getConsole() {
    return config.localdev
      ? config.devConsoleUrl
      : 'https://console.' + config.domain;
  }

  getNamespace(namespace) {
    return this.getConsole() + '/home/namespaces/' + namespace;
  }

  getApplications() {
    return this.getConsole() + '/home/cmf-apps';
  }

  getNamespacesAddress() {
    return this.getConsole() + '/home/workspace';
  }

  getCatalog(namespace) {
    return this.getNamespace(namespace) + '/cmf-service-catalog';
  }

  getInstancesList(namespace) {
    return this.getNamespace(namespace) + '/cmf-instances';
  }

  getInstance(namespace, instanceName) {
    return this.getInstancesList(namespace) + '/details/' + instanceName;
  }

  getService(namespace, serviceName) {
    return this.getNamespace(namespace) + '/services/details/' + serviceName;
  }

  getDocs() {
    return this.getConsole() + '/docs';
  }
}

class API {
  getAPI() {
    return 'https://apiserver.' + config.domain;
  }

  getNamespace(namespace) {
    return this.getAPI() + '/api/v1/namespaces/' + namespace;
  }
}

class Dex {
  getDex() {
    return 'https://dex.' + config.domain;
  }

  getOpenID() {
    return this.getDex() + '/.well-known/openid-configuration';
  }
}

module.exports = {
  console: new Console(),
  api: new API(),
  dex: new Dex(),
};
