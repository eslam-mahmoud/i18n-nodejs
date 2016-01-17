var Mustache = require('mustache');
var _lang = null;
var _filePath = null;//"../../locale.json";
var _locale = null;

module.exports = function(lang, filePath) {
	//set the lang and file relative path
	_lang = lang;
	_filePath = filePath;
	_locale = require(_filePath);

	return {
		//translation function
		__ : function(string, values) {
			//return translation of the original sting if did not find the translation
			var translation = string;
			if (typeof _locale[string] != "undefined" && typeof _locale[string][_lang] != "undefined") {
				translation = _locale[string][_lang];
			}
			//If user sent values to be rendered into the string
			if (values) {
				//If the string have place to render values withen
				if ((/{{.*}}/).test(translation)) {
					//render the named values into the translated||original text
					translation = Mustache.render(translation, values);
				}
			}
			return translation;
		}
	}
}