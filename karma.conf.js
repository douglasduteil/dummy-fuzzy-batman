'use strict';

var util = require('util');
var pkg = require('./package.json');
var extend = util._extend;
var geSaLaKaCuLa = require('gesalakacula');

var saucelabsBrowsers = require('./.saucelabs-all-browsers-snapshot');


// No Karma options are passed after the double dash option (`--`)
// Example : karma start --single-run -- --polyfill
//        >> { _: [], polyfill: true }

var _argv = process.argv;
var argv = require('minimist')(_argv.slice(_argv.indexOf('--') + 1));

var options = extend({
  travis: process.env.TRAVIS,
  saucelabs: false,
  reKaLa: false
}, argv);

module.exports = function(config) {
  extend(options, process.env);

  // Default Config
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: ['*.spec.js'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    client: {
      mocha: {
        reporter: 'html',
        timeout: 5000
      }
    }
  });

  if (options.travis) {
    // TRAVIS config overwrite
    config.set({
      singleRun: true,
      reporters: ['dots']
    });
  }

  if (options.saucelabs) {

    var customLaunchers = geSaLaKaCuLa(saucelabsBrowsers);


    var now = new Date();
    var buildData = options.travis ?
    {
      location: 'TRAVIS',
      name: process.env.TRAVIS_JOB_NUMBER,
      id: process.env.TRAVIS_BUILD_ID
    }
      :
    {
      location: 'LOCAL',
      name: now.toString(),
      id: +now
    };
    var build = util.format('%s #%s (%s)',
      buildData.location, buildData.name, buildData.id);

    ////

    console.log('SauceLabs Run\n- Build : ' + build + '\n');

    config.set({
      reporters: ['dots', 'saucelabs'],

      browserDisconnectTimeout: 10000,
      browserDisconnectTolerance: 2,
      browserNoActivityTimeout: 30000,
      captureTimeout: 120000,

      browsers: Object.keys(customLaunchers),
      sauceLabs: {
        testName: pkg.name,
        recordScreenshots: false,
        build: build,
        tunnelIdentifier: options.travis ?
          process.env.TRAVIS_JOB_NUMBER : Math.floor(Math.random() * 1000)
      },
      customLaunchers: customLaunchers
    });
  }

};

if (options.reKaLa){
    console.log('Launch recursive Karma tests');
    process.env.saucelabs = true;

    var customLaunchers = geSaLaKaCuLa(saucelabsBrowsers);

    // Limitation : Free Travis account
    // Travis can't run a job longer than an hour.
    //
    // Limitation : Open source Saucelab account
    // Saucelab run only 3 tests in parallel.
    //
    // The average duration of a test is ~1m30s
    // In a hour Travis <-> Saucelab can run ~100 tests in browsers
    //
    // I decide to pick only 100 tests randomly for this dummy test !
    if (options.travis){
        customLaunchers = shuffle(Object.keys(customLaunchers))
            .slice(0, 4)
            .reduce(function(memo, browsersName){
                memo[browsersName] = customLaunchers[browsersName];
                return memo;
            }, {});
    }

    geSaLaKaCuLa.recursiveKarmaLauncher({
        karma: require('karma').server,
        customLaunchers: customLaunchers
    }, function (code){
        console.log('reKaLa end with ', code);
        process.exit(code);
    });
}

////

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
