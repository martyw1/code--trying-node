var http = require('http');

var optionsget = {
    host : 'api.opencorporates.com',
    port : 80,
    path : '/v0.2/companies/search?q=barclays+bank&jurisdiction_code=gb',
    method : 'GET'
};


console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');

var reqGet = http.get(optionsget, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    buffer='';
    i = 0;

    // on 'data' coming back from the response socket, put that into 'd' and then add to variable 'buffer'
    res.on('data', function(d) {
        
        console.log('increment index = ' + i + '\n');
        console.log('buffer has text = ' + buffer + '\n');
        console.log('The socket 'd' has text = ' + d + '\n');

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
