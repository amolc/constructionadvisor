cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "in.edelworks.sharedpreferences.SharedPreferences",
    "file": "plugins/in.edelworks.sharedpreferences/www/sharedpreferences.js",
    "pluginId": "in.edelworks.sharedpreferences",
    "clobbers": [
      "sharedpreferences"
    ]
  },
  {
    "id": "cordova-plugin-firebase.FirebasePlugin",
    "file": "plugins/cordova-plugin-firebase/www/firebase.js",
    "pluginId": "cordova-plugin-firebase",
    "clobbers": [
      "FirebasePlugin"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "in.edelworks.sharedpreferences": "0.1.0",
  "cordova-plugin-firebase": "0.1.24",
  "cordova-plugin-whitelist": "1.3.2"
};
// BOTTOM OF METADATA
});