<?php
ini_set('display_errors', 1);
 define('APPKEY',''); // Your App Key
 define('PUSHSECRET', ''); // Your Master Secret
 define('PUSHURL', 'https://go.urbanairship.com/api/push/');

 $contents = array();
 $contents['badge'] = "+1";
 $contents['alert'] = "mmezi app";
 $contents['sound'] = "cat.caf";
 $notification = array();
 $notification['ios'] = $contents;
 $platform = array();
 array_push($platform, "ios");

 $push = array("audience"=>"all", "notification"=>$notification, "device_types"=>$platform);

 $json = json_encode($push);
 echo "Payload: " . $json . "\n"; //show the payload

 $session = curl_init(PUSHURL);
 curl_setopt($session, CURLOPT_USERPWD, APPKEY . ':' . PUSHSECRET);
 curl_setopt($session, CURLOPT_POST, True);
 curl_setopt($session, CURLOPT_POSTFIELDS, $json);
 curl_setopt($session, CURLOPT_HEADER, False);
 curl_setopt($session, CURLOPT_RETURNTRANSFER, True);
 curl_setopt($session, CURLOPT_HTTPHEADER, array('Content-Type:application/json', 'Accept: application/vnd.urbanairship+json; version=3;'));
 $content = curl_exec($session);
 echo "Response: " . $content . "\n";

 // Check if any error occured
 $response = curl_getinfo($session);
 if($response['http_code'] != 202) {
     echo "Got negative response from server: " . $response['http_code'] . "\n";
 } else {

     echo "Wow, it worked!\n";
 }

 curl_close($session);
?>
