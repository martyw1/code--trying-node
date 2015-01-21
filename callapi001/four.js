var http = require('http');

var optionsget = {
    host : 'api.opencorporates.com',
    port : 80,
    path : '/v0.3/companies/search?q=barclays+bank&jurisdiction_code=gb',
    method : 'GET'
};


console.info('\n==============================================');
console.info('\ndebug - Step 1: Options prepared:');
console.info(optionsget);
console.info('\n==============================================');
console.info('\ndebug - Step 2: Do the GET call');
console.info('\n==============================================');

var reqGet = http.get(optionsget, function(res) {

    // display some standard http data coming from the http 'GET' request.. happening as the stream comes in..
    console.info("debug - ..now we are in the GET request..\n");

    console.log("debug - Step 3: Display HTTP statusCode: ", res.statusCode);
    
 
    console.log("\ndebug - Step 4: Display HTTP headers: ", res.headers);
    console.info('\n==============================================');


    console.info("debug - Step 5: Initialize some temp variables");
    console.info("\n==============================================");
    buffer='';
    i = 0;


    // Perform HTTP GET request
    res.on('data', function(d) {
        
        // some debug statements to see things happen as they happen
        //console.info("\nincrement index = " + i);
        //console.info("\nbuffer has text = " + buffer);
        //console.info("\nThe socket d has text = " + d);

        // now we put the string coming back from the api call into 'buffer' appending as more text arrives
        buffer += d.toString();

        // now print the updated content in variable 'buffer'
        console.log('debug - buffer = ' + buffer + '\n');
        
        i++;
    });
    

    res.on('end', function() {
        console.info('debug - GET result:\n');
        console.log(buffer);
	
		var ex = '{ "id" : 1, "name" : "A green door", "price": 12 }';
		
		console.info('\ndebug - getting ready to parse');
		//var parsedData = JSON.parse('{ "id":1, "name": "a green door", "price": 12 }');
		//var parsedData = JSON.parse(ex);
		var parsedData = JSON.parse(buffer);
		
		
		console.info('\ndebug - dumping parsed data');
		console.info(parsedData); 
		console.info('\ndebug - results parsed.. ');
		//console.info('\ndebug - now to print something');
		//console.info('\n>> results = ' + parsedData.companies.name);
        console.info('\n\ndebug - Call completed');
    });
    


});
reqGet.on('error', function(e) {
    console.error(e);
});

reqGet.end();

