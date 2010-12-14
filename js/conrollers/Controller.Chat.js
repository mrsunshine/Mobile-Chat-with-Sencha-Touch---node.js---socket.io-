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
		this.chatStore = new App.Store.Chat();
		this.configStore = Ext.StoreMgr.get('ConfigStore');
		var settings = this.configStore.getAt(0);

		this.socket = new App.util.Socketio(settings.get('server'), {port: 4000});
		this.socket.connect();

		// Event Listener
		this.socket.on(
			'connect',
			this.registerUser,
			this
		);

		this.socket.on(
			'message',
			this.addMessageToChatStore,
			this
		);

		App.on(
			'newMsg',
			this.sendMessageToServer,
			this
		);
	},

	sendMessageToServer: function(msg){
		this.socket.send(msg);
	},

	addMessageToChatStore: function(message) {
		this.chatStore.add(message);
	},

	registerUser: function() {
		var settings = this.configStore.getAt(0);
		var user = {
			nickname: settings.get('nickname'),
			gravatar: settings.get('gravatar')
		};
		this.socket.send(user);
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