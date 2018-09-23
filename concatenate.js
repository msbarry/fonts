var fs = require('fs');
var glyphCompose = require('@mapbox/glyph-pbf-composite');


fs.readdirSync('_output').forEach(function (font) {
	if (font.indexOf('Roboto') === 0) {
		console.log(font);
		var outputFont = font.replace('Roboto', 'Robonoto');
		try {
			fs.mkdirSync('_output/' + font.replace('Roboto', 'Robonoto'));
		} catch (e) {}
		var noto = 'Noto Sans ';
		if (/bold$/i.test(font)) {
			noto += 'Bold';
		} else if (/italic$/i.test(font)) {
			noto += 'Italic';
		} else {
			noto += 'Regular';
		}
		fs.readdirSync('_output/' + font).forEach(function (file) {
			var result = glyphCompose.combine([fs.readFileSync('_output/' + font + '/' + file), fs.readFileSync('_output/' + noto + '/' + file)]);
			fs.writeFileSync('_output/' + outputFont + '/' + file, result);
		});
	}
});

// var result = glyphCompose.combine([fs.readFileSync(process.argv[2]), fs.readFileSync(process.argv[3])]);
// fs.writeFileSync(proess.argv[4], result);
