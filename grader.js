/*

#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
// added var  code
var rest = require('restler');
var URL_DEFAULT = "";

/*
var cheerioURLFile = function(url_name, checksfile,  callback) {
    var instr=url_name.toString();   //redudant
    rest.get(instr).on('complete', function(result) {
	if (result instanceof Error) {
	    console.log("%s cannot be found: %s", instr, result.message);
	    process.exit(1);
	}
	else {
	    console.log('$ is about to be called');
	    callback(result);
	    console.log('$ is called, so continue to next section');
	}
	var checks=loadChecks(checksfile).sort();
	var out={};
	for (var ii in checks) {
	    var present=$(checks[ii]).length>0;
	    out[checks[ii]]=present;
	}
	return out;
    });
};

var checkURL = function(url_name, checksfile) {
    $ = cheerioURLFile(url_name, checksfile, function (result) {console.log(result);});
    console.log('$ is being called');
};

*/



var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
	console.log("%s does not exist. Exiting.", instr);
	process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};


var assetURLValid = function(infile) {
    var instr = infile.toString();
    return instr;
};




/*
var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};
*/




var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};


var cheerioProcess = function(checksfile, htmldata) {
    $ = cheerio.load(htmldata);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
	var present = $(checks[ii]).length > 0;
	out[checks[ii]] = present;
    }
    return (out);
};

var printtoconsole = function(out) {
    var outJson = JSON.stringify(out, null, 4);
    console.log(outJson);
};

/*
var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
	var present = $(checks[ii]).length > 0;
	out[checks[ii]] = present;
    }
    return out;
};
*/


var checkHtml = function(htmlfile, checksfile, htmlurl) {
    if(htmlurl=="") fs.readFile(htmlfile, "utf8", function(error, data) {
	if (!(error)) {
	    var out = cheerioProcess(checksfile, data);
	    if (require.main==module) printtoconsole (out);
	    return(out);
	}
	else {
	    console.log ('HTML input file reading error');
	    process.exit(1);
	}
})
else rest.get(htmlurl).on('complete', function(result) {
       if (result instanceof Error) {
	   console.log('URL reading error: ' + result.message);
	   process.exit(1);}
       else {
	   var out = cheerioProcess(checksfile, result);
	   if(require.main==module) printtoconsole(out);
	   return(out);
	}
      });
};



var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
    program
	.option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
	.option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
	.option('-u, --url <url_link>', 'URL to index.html', clone(assertURLValid), URL_DEFAULT)
	.parse(process.argv);
	checkHtml(program.file, program.checks, program.url);
} else {
    exports.checkHtml = checkHtml;
}


/*    var checkJson = checkHtmlFile(program.file, program.checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);
} else {
    exports.checkHtmlFile = checkHtmlFile;
}
*/


*/




#!/usr/bin/env node

/*
Automatically grade files for the presense of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

  + cheerio
    - https://github.com/MatthewMueller/cheerio
    - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
    - http://maxogden.com/scraping-with-node.html

  + commander.js
    - https://github.com/visionmedia/commander.js
    - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

  + JSON
    - http://en.wikipedia.org/wiki/JSON
    - https://developer.mozilla.org/en-US/docs/JSON
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');

var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT = "http://www.test.test";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
	   console.log("%s does not exist. Exiting.", instr);
	   process.exit(1); // https://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
	var present = $(checks[ii]).length > 0;
	out[checks[ii]] = present;
    }
    return out;
};

var checkUrl = function(htmlfile, checksfile) {
    var instr = htmlfile.toString();
    $ = cheerio.load(instr);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
	var present = $(checks[ii]).length > 0;
	out[checks[ii]] = present;
    }
    var outJson = JSON.stringify(out, null, 4);
    console.log(outJson);
    return out;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
    program
	.option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
	.option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
	.option('-u, --url <url_file>', 'URL', URL_DEFAULT)
	.parse(process.argv);

    if(program.url !== URL_DEFAULT) {
	rest.get(program.url).on('complete', function(result) {
	    if (result instanceof Error) {
		console.log("Page not found!");
		process.exit(1);
	    } else {
		console.log("Checking " + program.url);
		checkUrl(result, program.checks);
	    }
	});
    } else {
    var checkJson = checkHtmlFile(program.file, program.checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);
    }

} else {
    exports.checkHtmlFile = checkHtmlFile;
}
