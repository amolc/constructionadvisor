 
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
 