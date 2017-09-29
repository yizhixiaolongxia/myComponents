'use strict'
const http = require('http')
const fs = require('fs')

const fileTypes = ['html', 'htm', 'jpg', 'png', 'txt', 'js','ico']

function filterSupportFileTypeUrl (url) {
    let r = false
    fileTypes.forEach(fileType => {
        if(url.indexOf(fileType) > -1) {
            r = url.split(fileType)[0]
            return false
        }
    })

    return r
}
http.createServer((request, response) => {
    const _url = request.url

    const fileUrl = filterSupportFileTypeUrl(_url)

    if(fileUrl) {
        fs.readFile(__dirname + request.url,
            function (err, data) {
                if (err) {
                    response.writeHead(404);
                    return response.end('Error loading index.html');
                }

                response.writeHead(200);
                response.end(data);
            })
    } else {
        response.writeHead(500);
        response.end('unknown error')
    }
}).listen(8689)

/*
 listen       8689;
 server_name  debug.plugins-h5.com;
 */