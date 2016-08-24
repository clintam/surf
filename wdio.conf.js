exports.config = {
  host: process.env.WEBDRIVER_HOST || 'localhost',
  specs: [
    './test/ui-fvt/**/*.js'
  ],
  exclude: [
  ],
  capabilities: [{
    browserName: 'chrome'
  }],
  sync: true,
  logLevel: 'result',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: 'http://server:8080',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',

  mochaOpts: {
    ui: 'bdd'
  }
}
