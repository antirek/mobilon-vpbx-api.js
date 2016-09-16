var MobilonVPBXApi = function (keyIn) {
	var key = keyIn;

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

		socket.onopen = function() {
  			socket.send('{"key":"' + key + '"}');
		};
	};

	return {
		call: call,
		subscribe: subscribe
	};
};