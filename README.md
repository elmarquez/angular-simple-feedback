angular-simple-feedback
=======================

Easy to configure widget that allows users to provide feedback about a
web page.


Library Dependencies
--------------------

Requires that you manually include the Google recaptcha library:

    https://www.google.com/recaptcha/api.js?onload=onLoadCallback&render=explicit

Its typically best to defer loading of the the script by including the
script tag in the body of the document body.

    <script src="https://www.google.com/recaptcha/api.js?onload=onLoadCallback&render=explicit"></script>
    

Build and Runtime Dependencies
------------------------------

Install all build dependencies:

    npm install

Install all client dependencies:

    bower install

Compile the library and demo page:

    grunt compile
    
Compile the library and demo page with a recaptcha.

    grunt compile --recaptcha=RECAPTCHA_SITE_KEY

Specify the recaptcha site key with data contained in a file:

    grunt compile --recaptcha="$(< conf/recaptcha)"


Test
----

Download Selenium server, Chrome driver and save them to /opt/selenium.
Selenium server is available for download at:

    https://selenium-release.storage.googleapis.com/index.html

ChromeDriver is available for download at:

    http://chromedriver.storage.googleapis.com/index.html

Execute all tests:

    grunt test

Execute only the test suite:

    grunt test


Release
-------

Check out the master branch. Rebase the master on top of develop. Tag
and push the release to the origin repository.

    grunt release
