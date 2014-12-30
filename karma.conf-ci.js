//

var geSaLaKaCuLa = require('gesalakacula');

module.exports = function (config) {

  var customLaunchers = geSaLaKaCuLa({
    'Linux': {
      'android': '4.0,4.1,4.2,4.3,4.4',
      'chrome': '26..39,beta,dev',
      'firefox': '3.6,4..34,beta,dev',
      'opera': '12'
    },
    'OS X 10.6': {
      'ipad': '4.3, 5.0',
      'iphone': '4.3, 5.0',
      'chrome': '27..39,beta,dev',
      'firefox': '4..34,beta,dev',
      'safari': '5'
    },
    'OS X 10.8': {
      'ipad': '5.1,6.0,6.1',
      'iphone': '5.1,6.0,6.1',
      'chrome': '27..39,beta,dev',
      'safari': '6'
    },
    'OS X 10.9': {
      'ipad': '7.0,7.1,8.0,8.1',
      'iphone': '7.0,7.1,8.0,8.1',
      'chrome': '31..39,beta,dev',
      'firefox': '4..34,beta,dev',
      'safari': '7'
    },
    'OS X 10.10': {
      'chrome': '37..39',
      'firefox': '32..34',
      'safari': '8'
    },
    'Windows XP': {
      'chrome': '26..39,beta,dev',
      'firefox': '3.0,3.5,3.6,4..34,beta,dev',
      'internet explorer': '6..8',
      'opera': '11..12'
    },
    'Windows 7': {
      'chrome': '26..39,beta,dev',
      'firefox': '3.0,3.5,3.6,4..34,beta,dev',
      'internet explorer': '8..11',
      'opera': '11..12'
    },
    'Windows 8': {
      'chrome': '26..39,beta,dev',
      'firefox': '3.0,3.5,3.6,4..34,beta,dev',
      'internet explorer': '10'
    },
    'Windows 8.1': {
      'chrome': '26..39,beta,dev',
      'firefox': '3.0,3.5,3.6,4..34,beta,dev',
      'internet explorer': '11'
    }
  });

  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      '*.spec.js'
    ],
    reporters: ['dots', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true,

    browserDisconnectTimeout: 30 * 60 * 1000, // 30 min
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 10 * 60 * 1000, // 10 min
    captureTimeout: 30 * 60 * 1000, // 30 min

    browsers: Object.keys(customLaunchers),
    sauceLabs: {
      testName: 'dummy-fuzzy-batman',
      recordScreenshots: false
    },
    customLaunchers: customLaunchers
  });


  if (process.env.TRAVIS) {
    var buildLabel = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';

    config.sauceLabs.build = buildLabel;
    config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
  }
};
