cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-firebase.FirebasePlugin",
        "file": "plugins/cordova-plugin-firebase/www/firebase.js",
        "pluginId": "cordova-plugin-firebase",
        "clobbers": [
            "FirebasePlugin"
        ]
    },
    {
        "id": "in.edelworks.sharedpreferences.SharedPreferences",
        "file": "plugins/in.edelworks.sharedpreferences/www/sharedpreferences.js",
        "pluginId": "in.edelworks.sharedpreferences",
        "clobbers": [
            "sharedpreferences"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-firebase": "0.1.24",
    "cordova-plugin-whitelist": "1.3.2",
    "in.edelworks.sharedpreferences": "0.1.0"
};
// BOTTOM OF METADATA
});