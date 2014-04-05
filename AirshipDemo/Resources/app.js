/*
 * Demonstrates how to receive notifications from UA
 */

// open a single window
var window = Ti.UI.createWindow({backgroundColor:'#336699'});

window.add(Ti.UI.createLabel({
    text: 'DeviceID:',
    top: 50,
    left: 10,
    textAlign: 'left',
    color: 'white',
    font: {fontSize: 18, fontStyle: 'bold'},
    height: Ti.UI.SIZE || 'auto'
}));

var labelID = Ti.UI.createLabel({
    text: '',
    top: 50,
    left: 110,
    right: 10,
    textAlign: 'left',
    color: 'white',
    font: {fontSize: 18, fontStyle: 'bold'},
    height: Ti.UI.SIZE || 'auto'
});
window.add(labelID);

window.add(Ti.UI.createLabel({
    text: 'Last Message:',
    top: 150,
    left: 10,
    textAlign: 'left',
    color: 'white',
    font: {fontSize: 18, fontStyle: 'bold'},
    height: Ti.UI.SIZE || 'auto'
}));

var labelMessage = Ti.UI.createLabel({
    text: '',
    top: 150,
    left: 140,
    right: 10,
    textAlign: 'left',
    color: 'white',
    font: {fontSize: 18, fontStyle: 'bold'},
    height: Ti.UI.SIZE || 'auto'
});
window.add(labelMessage);

window.add(Ti.UI.createLabel({
    text: 'Payload:',
    top: 240,
    left: 10,
    textAlign: 'left',
    color: 'white',
    font: {fontSize: 18, fontStyle: 'bold'},
    height: Ti.UI.SIZE || 'auto'
}));

var labelPayload = Ti.UI.createLabel({
    text: ' ',
    top: 240,
    left: 110,
    right: 10,
    textAlign: 'left',
    color: 'white',
    font: {fontSize: 18, fontStyle: 'bold'},
    height: Ti.UI.SIZE || 'auto'
});
window.add(labelPayload);

window.open();

var UrbanAirship = require('ti.urbanairship');
Ti.API.info("module is => " + UrbanAirship);

/*
 Urban Airship will load the options from an AirshipConfig.plist file that
 should be stored in the application bundle. You will find an example
 AirshipConfig.plist file in the 'example/platform/iphone' folder of the module.
*/

// Set UA options
UrbanAirship.tags = [ 'testingtesting', 'appcelerator', 'my-tags' ];
UrbanAirship.alias = 'testDevice';
UrbanAirship.autoBadge = true;
UrbanAirship.autoResetBadge = true;

function eventCallback(e) {
	// Pass the notification to the module
    UrbanAirship.handleNotification(e.data);
    	
  	Ti.API.info('Push message received');
  	Ti.API.info('  Message: ' + e.data.alert);
  	Ti.API.info('  Payload: ' + e.data.aps);
    
    labelMessage.text = e.data.alert;
	labelPayload.text = JSON.stringify(e.data.aps);	
}

function eventSuccess(e) {
	// *MUST* pass the received token to the module
    UrbanAirship.registerDevice(e.deviceToken);  
    
    Ti.API.info('Received device token: ' + e.deviceToken);
    labelID.text = e.deviceToken;
   	
}

function eventError(e) {
    Ti.API.info('Error:' + e.error);
    var alert = Ti.UI.createAlertDialog({
        title: 'Error',
        message: e.error
    });
    alert.show();	
}

Ti.Network.registerForPushNotifications({
    types:[
        Ti.Network.NOTIFICATION_TYPE_BADGE,
        Ti.Network.NOTIFICATION_TYPE_ALERT,
        Ti.Network.NOTIFICATION_TYPE_SOUND
    ],
    success: eventSuccess,
    error: eventError,
    callback: eventCallback
});

