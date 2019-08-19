var express = require('express')
var parser = require('ua-parser-js')
var app = express()


app.set('port', (process.env.PORT || 5000))

app.get('/', function(request, response) {
var software = parser(request.get('user-agent'))
var ip = request.headers['x-forwarded-for'] ||
     request.connection.remoteAddress ||
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress;
 console.log(ip);
var language = request.get('accept-language')
var userObject = {
  "ip-address": ip,
  "language": language.split(',')[0],
  "OS": software.os.name + " " + software.os.version
}
console.log('software: ' + JSON.stringify(software.os.name) + " " + JSON.stringify(software.os.version))
console.log('ip: ' + ip)
console.log('language: ' + language.split(',')[0])
  response.send(userObject)
})

app.listen(app.get('port'), function() {
  console.log('node is running on port', app.get('port'))
})
