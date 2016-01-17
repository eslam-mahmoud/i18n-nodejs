# i18n-nodejs

I18n module for node, out of frustration with over complicated modules for translation & localization I created this module with simplicity in mind.

## Install

```shell
npm install i18n-nodejs --save
```

## Usage

```js
var config = {
	"lang": "ar",
	"langFile": "./../../locale.json"//relative path to index.js file of i18n-nodejs module
}
//init internationalization / localization class
var i18n = require('i18n-nodejs')(config.lang, config.langFile);
console.log(i18n.__('Welcome')); // output => 'اهلا'
```

### Languages file

`langFile` is JSON file have the text that you need to translate as `key` and the `value` is object its `key` is language abbreviation and the `value` is the translated text.

```js
{
	"Welcome": {
		"ar": "مرحبا",
		"fr": "Bienvenue"
	},
	"Looking for user": {
		"ar": "نبحث الان عن مستخدم اخر"
	},
	"You have disconnected.": {
		"ar": "تم قطع الاتصال."
	},
	"Chat": {
		"ar": "شات"
	}
}
```

### Find the translation

The module will try to find the translation using the language abbreviation if could not find it will return the original text.

### variables
If the text has `variable` that need to be translated you should add the the text like `{{name}}` and you need to pass the translated value of that `variable` as second arg into the `__()` function.
```js
//Language file
{
	"Welcome {{name}}": {
		"ar": "مرحبا {{name}}"
	},
	"eslam": {
		"ar": "اسلام"
	}
}
```
```js
//index.js file
var config = {
	"lang": "ar",
	"langFile": "./../../locale.json"//relative path to index.js file of i18n-nodejs module
}
//init internationalization / localization class
var i18n = require('i18n-nodejs')(config.lang, config.langFile);
console.log(i18n.__("Welcome {{name}}", {name: "اسلام"}));
// output => 'مرحبا اسلام'
```

If you do not want to write the tranlation directly in your code (wich you should not do) you should add the value and its translation the langauage file and use it like that
```js
console.log(i18n.__("Welcome {{name}}", {name: i18n.__("eslam")}));
// output => 'مرحبا اسلام'
```

## Links
- [Bug Report](https://github.com/eslam-mahmoud/i18n-nodejs/issues)
- [Author: Eslam Mahmoud](https://eslam.me)