Ext.ns('App.util');
/**
 * Socket.io  wrapper class
 * @class App.util.Socketio
 * @extends Ext.util.Observable
 */
App.util.Socketio = Ext.extend(Ext.util.Observable, {

	constructor: function(host, options){

		options = options || {};


		App.util.Socketio.superclass.constructor.call(
			this
		);

		this.socket = new io.Socket(host, options);
		var that = this;

		this.socket.on('connect', function(){
			that.onConnect();
		});
		this.socket.on('message', function(data){
			that.onMessage(data);
		});
		this.socket.on('close', function(){
			that.onClose();
		});
		this.socket.on('disconnect', function(){
			that.onDisconnect();
		});

	},

	/**
	 * connect
	 */
	connect: function() {
		this.socket.connect();
	},

	disconnect: function(){
		this.socket.disconnect();
	},

	send: function(message) {
		this.socket.send(message);
	},

	onConnect: function() {
		this.fireEvent('connect');
	},

	onDisconnect: function() {
		this.fireEvent('disconnect');
	},

	onClose: function() {
		this.fireEvent('close');
	},

	onMessage: function(message) {
		this.fireEvent('message', message);
	}
});
Ext.reg('App.util.Socketio', App.util.Socketio);