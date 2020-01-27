const https = require('https');

let CHROME_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
let FIREFOX_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1';
let IE_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko';
let datos;


let options = {
    host: 'bazarapi.herokuapp.com',
    path: '/Lamina?desde=0&limite=5',
    method: 'GET',
    headers: { 'user-agent': IE_USER_AGENT }
};

https.request(options, (response) => {
    let body = '';
    let json = '';
    response.on('data', (out) => {
        body += out;
    });
    response.on('end', (out) => {
        json = JSON.parse(body);
        console.log(json);
    });
    console.log(json);
}).on('error', (e) => {
    console.log(e);
}).end()









module.exports = {

};