Prerequisites:
NPM
GIT
Visual Studio 2013+
.Net Framework


WAH_SMS

  Most of the tooling in the CLI is based on Node and is managed through npm. The quickest way to get Node and NPM installed on your machine is through the NodeJS installer. Be sure to install the LTS version of Node. Close any terminals/command prompts you may have open, run the installer, and launch a new terminal window. To verify you have everything installed correctly, you can run npm --version and node --version. If this errors, please resolve before moving on.

--Ionic CLI and Cordova--
  With Node and NPM setup, Install the Ionic and Cordova CLI.

  $ npm install -g ionic cordova

--Running the App on Browser--
  cd into the directory that was created and then run the ionic serve command to test your app right in the browser.
  
  $ cd WAH_SMS
  $ ionic serve
  
--Running the App on Android Device--
  
  $ cd WAH_SMS
  $ ionic cordova run android --prod

--Building unsigned APK--
  
  $ ionic cordova build android --prod
  
  Unsigned app will be saved on *\platforms\android\app\build\outputs\apk\debug\app-debug.apk
  
  Reference: https://ionicframework.com/docs/
