var MobilonVPBXApi = function (keyIn) {
    var key = keyIn;
    var token = null;

    var call = function (number) {
        var callUrl = '//connect.mobilon.ru/api/call/CallToSubscriber';
        return fetch(callUrl + "?key=" + key + "&outboundNumber=" + number);
    };

    var subscribe = function (callback) {
        var subscribeUrl = 'wss://webapi.mobilon.ru:8080/';
        var socket = new WebSocket(subscribeUrl);

        socket.onmessage = function (event) {
            callback(event);
        };

        socket.onopen = function () {
            socket.send('{"key":"' + key + '"}');
        };
        return socket;
    };

    var setToken = function (tokenIn) {
        token = tokenIn;
    };

    var info = function (callid) {
        if (token) {
            var infoUrl = '//connect.mobilon.ru/api/call/info';
            return fetch(infoUrl + "?token=" + token + "&callid=" + callid);
        } else {
            return Promise.reject('token not defined');
        }
    };

    var journal = function(date){
        if (token) {
            var journalUrl = '//connect.mobilon.ru/api/call/journal';
            return fetch(journalUrl + "?token=" + token + "&date=" + date);
        } else {
            return Promise.reject('token not defined');
        }  
    }

    return {
        call: call,
        subscribe: subscribe,
        setToken: setToken,
        info: info,
        journal:journal
    };
};