var http = require('http');

var optionsget = {
    host : 'api.opencorporates.com',
    port : 80,
    path : '/v0.2/companies/search?q=barclays+bank&jurisdiction_code=gb',
    method : 'GET'
};


console.info('\n==============================================')
console.info('\nStep 1: Options prepared:');
console.info(optionsget);
console.info('\n==============================================')
console.info('\nStep 2: Do the GET call');
console.info('\n==============================================')

var reqGet = http.get(optionsget, function(res) {

    // display some standard http data coming from the http 'GET' request.. happening as the stream comes in..
    console.info("..now we are in the GET request..") 
    console.info("Step 3: display interesting HTTP responses as we start the GET request");
    console.log("statusCode: ", res.statusCode);
    
    console.log("\nheaders: ", res.headers);
    console.info('\n==============================================')

    buffer='';
    i = 0;

    // on 'data' coming back from the response socket, put that into 'd' and then add to variable 'buffer'
    res.on('data', function(d) {
        
        // some debug statements to see things happen as they happen
        console.info('\nincrement index = ' + i);
        console.info('\nbuffer has text = ' + buffer);
        console.info('\nThe socket d has text = ' + d + '\n');

        // now we put the string coming back from the api call into 'buffer' appending as more text arrives
        buffer += d.toString();

        // 
        console.log('buffer = ' + buffer + '\n');
        
        i++;
    });

    res.on('end', function() {
        console.info('GET result:\n');
        console.log(buffer);
        console.info('\n\nCall completed');
    });

});
reqGet.on('error', function(e) {
    console.error(e);
});

reqGet.end();

