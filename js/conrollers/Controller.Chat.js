/**
 * Chat Controller
 *
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.regController('Chat', {
	/**
	 * Index action
	 *
	 * @return {void}
	 */
	index: function() {

		if (!this.socket) {
			this.initSocketConnection();
		}

		this.showChat();
	},

	/**
	 * init the socket connection to the node.js server
	 * using user settings
	 *
	 */
	initSocketConnection: function() {
		var chatStore = new App.Store.Chat();
		var configStore = Ext.StoreMgr.get('ConfigStore');
		var settings = configStore.getAt(0);
		var user = {
			nickname: settings.get('nickname'),
			gravatar: settings.get('gravatar')
		};

		var socket = new io.Socket(settings.get('server'), {port: 4000});
		this.socket = socket;

		socket.connect();

		socket.on('connect',
			function() {
				socket.send(user);
			},
			this
		);


		socket.on('message', function(message) {
			chatStore.add(message);
		});

		App.on(
			'newMsg',
			function(msg){
				this.socket.send(msg);
			},
			this
		);
	},

	/**
	 * Show chat view
	 */
	showChat: function() {
		if (!this.viewChat) {

			this.viewChat = this.render({
				xtype: 'App.View.Chat'
			});

			this.viewChat.query('#settingsButton')[0].on(
				'tap',
				this.showConfig,
				this
			);
		}
		this.application.viewport.setActiveItem(
			this.viewChat,
			{
				type: 'slide',
				direction: 'left'
			}
		);
	},

	/**
	 * Show config View
	 */
	showConfig: function() {
		Ext.dispatch({
			controller: 'Viewport',
			action    : 'showConfig'
		});
	}
});