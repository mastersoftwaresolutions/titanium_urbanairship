titanium_urbanairship
=====================

This is  a demo for using Urban Airship  which is a third party service that manages the bulk sending of push notifications..

----------


How to Use
---------
1) You need to import urban airship module  in your application.You will find an example  AirshipConfig.plist file in the 'example/platform/iphone' folder of the module. You need to import that in your application.

2) You need to create your application using urban airship account.

3)  In Urban Airship dashboard , Apple Push Certificate: here you need to choose your .p12 certificate .The one you get when you export your SSL certificate from keychain access. 

4) Enter your Certificate password and click save.

5) A unique application key , application secret and master secret key  will be generated which can be found when you go into your app from the Urban Airship dashboard and click on Settings » API Keys 

6) Urban Airship will load the  application key and application secret key from an AirshipConfig.plist file that should be stored in the application bundle.

7) The master secret key will be used to control the backend server
