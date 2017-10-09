cordova-plugin-sharedpref

=========

A small library providing utility methods to `save` and `get` a string to the native Shared preference of android

## Installation

  npm install cordova-plugin-sharedpref --save

## Usage
In the index.html include :
```html
  <script type="text/javascript" src="SharedPref.js"></script>
```

```javascript

/**
* to save a value to the shared preference
* @param {string} type save or get
* @param {string} key the key to be stored
* @param {string} value The value/text to be stored
*/
SharedPref.arkPref("save", "name", "yovan juggoo", function (prefObj) {
    alert(JSON.stringify(prefObj));
 });
 
/**
* to get a value from the shared preference
* @param {string} type save or get
* @param {string} key the key to be stored
* @param {string}  " " an empty string
*/
SharedPref.arkPref("get", "name", " ", function (prefObj) {
    alert(prefObj.name);// .name is the key of the object received by the callback
});

```

## Release History

* 0.0.3 Initial release
