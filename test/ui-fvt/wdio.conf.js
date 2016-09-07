exports.config = {
  debug: true,
  /**
   * server configurations
   */
  host: process.env.WEBDRIVER_HOST || 'localhost',
  port: 4444,

  /**
   * specify test files
   */
  specs: [
    './test/ui-fvt/test.js'
  ],
  exclude: [
  ],

  /**
   * capabilities
   */
  capabilities: [{
    browserName: 'chrome'
  }],

  /**
   * test configurations
   */
  logLevel: 'silent',
  coloredLogs: true,
  screenshotPath: 'build/screenshots',
  baseUrl: `http://${process.env.SERVER_HOST || 'server'}:8080`,
  waitforTimeout: 1000,
  framework: 'mocha',

  reporters: ['dot', 'spec'],
  reporterOptions: {
    outputDir: './'
  },

  mochaOpts: {
    ui: 'bdd',
    timeout: '30000'
  }

}
