import { getTenants } from './helpers/navigation-helpers';

const compassMfUrl = window.clusterConfig.microfrontendContentUrl;

let token = null;
if (localStorage.getItem('luigi.auth')) {
  try {
    token = JSON.parse(localStorage.getItem('luigi.auth')).idToken;
  } catch (e) {
    console.error('Error while reading ID Token: ', e);
  }
}

const navigation = {
  nodes: () => [
    {
      hideSideNav: true,
      pathSegment: 'overview',
      label: 'Overview',
      viewUrl: compassMfUrl,
      context: {
        idToken: token,
      },
    },
    {
      hideSideNav: true,
      hideFromNav: true,
      pathSegment: 'tenant',
      children: [
        {
          hideSideNav: true,
          pathSegment: ':tenantId',
          navigationContext: 'tenant',
          context: {
            idToken: token,
            tenantId: ':tenantId',
          },
          children: [
            {
              keepSelectedForChildren: true,
              pathSegment: 'runtimes',
              label: 'Runtimes',
              viewUrl: compassMfUrl + '/runtimes',
              children: [
                {
                  pathSegment: 'details',
                  children: [
                    {
                      pathSegment: ':runtimeId',
                      label: 'Runtimes',
                      viewUrl: compassMfUrl + '/runtime/:runtimeId',
                    },
                  ],
                },
              ],
            },
            {
              keepSelectedForChildren: true,
              pathSegment: 'applications',
              label: 'Applications',
              viewUrl: compassMfUrl + '/applications',
              children: [
                {
                  pathSegment: 'details',
                  children: [
                    {
                      pathSegment: ':applicationId',
                      viewUrl: compassMfUrl + '/application/:applicationId',
                      navigationContext: 'application',
                      children: [
                        {
                          pathSegment: 'api',
                          children: [
                            {
                              pathSegment: ':apiId',
                              viewUrl:
                                compassMfUrl +
                                '/application/:applicationId/api/:apiId',
                              children: [
                                {
                                  pathSegment: 'edit',
                                  label: 'Edit Api',
                                  viewUrl:
                                    compassMfUrl +
                                    '/application/:applicationId/api/:apiId/edit',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          pathSegment: 'eventApi',
                          children: [
                            {
                              pathSegment: ':eventApiId',
                              viewUrl:
                                compassMfUrl +
                                '/application/:applicationId/eventApi/:eventApiId',
                              children: [
                                {
                                  pathSegment: 'edit',
                                  label: 'Edit Api',
                                  viewUrl:
                                    compassMfUrl +
                                    '/application/:applicationId/eventApi/:eventApiId/edit',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              keepSelectedForChildren: true,
              pathSegment: 'scenarios',
              label: 'Scenarios',
              viewUrl: compassMfUrl + '/scenarios',
            },
            {
              keepSelectedForChildren: true,
              pathSegment: 'metadata-definitions',
              label: 'Metadata Definitions',
              viewUrl: compassMfUrl + '/metadata-definitions',
              category: 'SETTINGS',
              children: [
                {
                  pathSegment: 'details',
                  children: [
                    {
                      pathSegment: ':definitionKey',
                      label: 'Metadata Definition',
                      viewUrl:
                        compassMfUrl + '/metadatadefinition/:definitionKey',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  contextSwitcher: {
    defaultLabel: 'Select Tenant...',
    parentNodePath: '/tenant',
    lazyloadOptions: false,
    options: getTenants,
  },
};

export default navigation;
