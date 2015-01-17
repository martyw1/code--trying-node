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

    res.on('data', function(d) {
        //console.info('GET result:\n');
        //process.stdout.write(d);
        buffer += d.toString();
        //console.info('\n\nCall completed');
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
