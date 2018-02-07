# FrontierTests

This is a repository for the unit tests for 'https://internet.frontier.com/?lp=6108'.

To run:
1. Install modules via `npm install`
2. Install webdriverio via `http://webdriver.io/guide.html`
3. If you want to run the tests you must install the browser's driver you want to run on.
  - ChromeDriver is not included with Chrome
4. Run using `./node_modules/.bin/wdio wdio.conf.js`

If you would like to change the browser to run the tests on (originally run on FireFox):
1. Go to `./wdio.conf.js`
2. Edit `browserName`

This uses Webdriverio and the Mocha framework with Node's `assert` module.

The tests check:
- If the main page loaded
- If the main page has the correct title
- If the headers loaded
- If the header redirects to home-page
- If the footers loaded
- If the ZIP input takes a valid ZIP
- If the ZIP does not take a valid length, alphanumeric ZIP
- If the ZIP does not take an invalid length, numeric ZIP
- If the error message shows on invalid ZIP
- If all `<a>` tags have a valid `href` link 

First should check large, website breaking errors, such as if the page or components don't load.
It should also test for interactions from users (inputs, clicks, drags, etc).
Then should test smaller components that have effects on user experience.
