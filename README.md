# i18n-nodejs

i18n module for node, out of frustration with over complicated modules for translation & localization, I created this module with simplicity in mind.

## Install

```shell
npm install i18n-nodejs --save
```

## Usage

### Old/Deprecated

```js
var config = {
	"lang": "ar",
	"langFile": "./../../locale.json"//relative path to index.js file of i18n-nodejs module
}
//init internationalization / localization class
var i18n = require('i18n-nodejs')(config.lang, config.langFile);
console.log(i18n.__('Welcome')); // output => 'اهلا'
```
### New

```js
var config = {
	"lang": "ar",
	"langFile": "./../../locale.json"//relative path to index.js file of i18n-nodejs module
}
//init internationalization / localization class
var i18n_module = require('i18n-nodejs');
var i18n = new i18n_module(config.lang, config.langFile);
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

### Variables
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
var i18n_module = require('i18n-nodejs');
var i18n = new i18n_module(config.lang, config.langFile);
console.log(i18n.__("Welcome {{name}}", {name: "اسلام"}));
// output => 'مرحبا اسلام'
```

If you do not want to write the translation directly in your code (which you should not do) you should add the value and its translation the language file and use it like that
```js
console.log(i18n.__("Welcome {{name}}", {name: i18n.__("eslam")}));
// output => 'مرحبا اسلام'
```

## Version 3.0.0
Changed how the module was constructed now uses class format, so you must user `new i18n()` in the contruction of the class.
```js
var config = {
	"lang": "ar",
	"langFile": "./../../locale.json"//relative path to index.js file of i18n-nodejs module
}
//init internationalization / localization class
var i18n_module = require('i18n-nodejs');
var i18n = new i18n_module(config.lang, config.langFile);
console.log(i18n.__('Welcome')); // output => 'اهلا'
```


## Version 2.0.0
## Pluralization
Starting form version `2.0.0` we now support pluralization, First let us describe the problem let say we want to display "Hi Eslam, you have 555 points", but if you want to display that text in arabic the word "points" will have 5 different possibilities to be rendered in as it is the rule in Arabic language in case of plural each of them depend on the number before the word.

So instead of writing it as 
```js
//this is wrong
"Hi {{name}}, you have {{points_count}} points"
```
You should pass the count to the variable as `{{var||var_count}}`
```js
i18n.__(
    "Hi {{name}}, you have {{points_count}} {{points||points_count}}", {   
        name: i18n.__("eslam"), 
        points_count: 555
    }
```
As you see we passed the variable `name` also we passed the `points_count` in two places
- where we want it to be displayed
- where we need to handle the pluralization after `||`

The translation file should be 
```js
{
    "Hello {{name}}, you have {{points_count}} {{points||points_count}}": {
		"ar":  "مرحبا {{name}}, لديك {{points_count}} {{points||points_count}}"
	},
	"eslam": {
		"ar": "اسلام"
	},
	"points": {
		"ar": {
			"0": "نقاط",
			"1": "نقطة",
			"2": "نقطتين",
			"3": "نقاط",
			"4": "نقطة",
			"5": "نقطة"
		}
	}
}
```
You can find all the rules in [this localization guide](http://localization-guide.readthedocs.org/en/latest/l10n/pluralforms.html)

There is a note also as you can see we did not submit the `points` variable in the values object as second param for `__(string, values object)` because now the module is smarter and will look first for the translation in the values param then if it is not there will look for it in the file set in the constructor

## Summary of updates
- Version 2.0.0 support pluralization, remove the dependency to other packages to make it even simpler and light for your app and if you passed any values for any variable in the second param it will overwrite the original value in the translation file.
- Version 3.0.0 Changed how the module was constructed now uses class format, so you must user `new i18n()` in the contruction of the class.

## Links
- [pluralization rules guide](http://localization-guide.readthedocs.org/en/latest/l10n/pluralforms.html)
- [Bug Report](https://github.com/eslam-mahmoud/i18n-nodejs/issues)
- [Author: Eslam Mahmoud](https://eslam.me)
