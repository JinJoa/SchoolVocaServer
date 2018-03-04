/**
 * Created by jinjoa on 2018. 3. 4..
 */


console.log("Hello Node");

'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:8000
});

// Add the route
server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {

        return h.redirect('/hello');
    }
});

server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
});

server.route({
    method:'GET',
    path:'/sorry',
    handler:function(request,h) {

        return'서버가 점검중입니다. 지송합니다';
    }
});

server.route({
    method:'GET',
    path:'/user/register',
    handler:function(request,h) {

        var userID = request.query.userID;
        var userPasssword = request.query.userPassword;

        console.log("id: " + userID);
        console.log("pw: " + userPasssword);

        return 'test';
    }
});

server.route({
    method:'GET',
    path:'/user/register/{userID}/{userPassword}',
    handler:function(request,h) {

        console.log("register by params");

        var userID = request.params.userID;
        var userPasssword = request.params.userPassword;

        console.log("id: " + userID);
        console.log("pw: " + userPasssword);

        return 'test';
    }
});

server.route({
    method:'POST',
    path:'/user/register',
    handler:function(request,h) {

        console.log("POST");

        var payload = request.payload;
        var userID = request.payload.userID;
        var userPasssword = request.payload.userPasssword;

        let a = 10;
        const b = 12;
        //
        console.log("id: " + userID);
        console.log("pw: " + userPasssword);

        return 'test';
    }
});

server.route({
    method:'POST',
    path:'/quiz/get',
    handler:function(request,h) {

        console.log("POST");

        var payload = request.payload;
        var userID = request.payload.userID;
        //
        console.log("id: " + userID);

        var reply;
        if(userID.length == 0) {
            reply = {
                error : 'id not found',
            };

        } else {
            reply = {
                error : '',
                userID : userID,
                date : '2018-01-23 23:15:00',
                data : [
                    {
                        english : 'hello',
                        korean : '안녕'
                    },
                    {
                        english : 'car',
                        korean : '자동차'
                    },
                    {
                        english : 'space',
                        korean : '우주'
                    },
                ],
            };
        }

        return reply;
    }
});


// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();