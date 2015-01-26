# dummy-fuzzy-batman
[![Build Status][travis-image]][travis-url] [![Sauce Test Status][saucelabs-image]][saucelabs-url]

Dummy example for [gesalakacula](https://www.npmjs.com/package/gesalakacula) with saucelabs + karma + mocha + chai

[![Sauce Test Status][saucelabs-browser-matrix-image]][saucelabs-url]

## Note to make it work

I'm directly setting the [environment variables via the repository settings pane ](http://blog.travis-ci.com/2014-08-22-environment-variables/) like :

![setting](https://cloud.githubusercontent.com/assets/730511/5653347/b5bcdd74-96b9-11e4-964e-069af070f3c9.png)

With `SAUCE_USERNAME` your user name (here `dummy-fuzzy-batman` for https://saucelabs.com/u/dummy-fuzzy-batman) and `SAUCE_ACCESS_KEY` your user access key given by sauce lab : 

![sauce-access-key](https://cloud.githubusercontent.com/assets/730511/5653465/b43a41f2-96ba-11e4-9a37-786e0f6514b3.png)



[travis-url]: https://travis-ci.org/douglasduteil/dummy-fuzzy-batman
[travis-image]: https://travis-ci.org/douglasduteil/dummy-fuzzy-batman.svg?branch=master
[saucelabs-url]: https://saucelabs.com/u/dummy-fuzzy-batman
[saucelabs-image]: https://saucelabs.com/buildstatus/dummy-fuzzy-batman
[saucelabs-browser-matrix-image]: https://saucelabs.com/browser-matrix/dummy-fuzzy-batman.svg
