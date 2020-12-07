let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTPS server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require('socket.io').listen(server);

let input = io.of('/input');
let output = io.of('/output');

input.on('connection', (socket) => {
    console.log('input socket connected : ' + socket.id);


    socket.on('dataPosition', (data) => {
        //console.log("got data from input");
        //console.log(data);
        //socket.emit("cubePosition", data)
        output.emit("cubePosition", data);
    });
});


output.on('connection', (socket) => {
    console.log('output socket connected !!!!!!! : ' + socket.id);
});
