/**
 * Chat Controller
 *
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.regController('Viewport', {

	/**
	 * Index action
	 *
	 * @return {void}
	 */
	index: function() {
		var configStore = new App.Store.Config();
		configStore.load();

		if (configStore.getCount() > 0) {
			this.showChat();
		} else {
			this.showConfig();
		}
	},

	/**
	 * Show the chat view
	 *
	 */
	showChat: function() {
		Ext.dispatch({
			controller: 'Chat',
			action    : 'index'
		});
	},

	/**
	 * Show config view
	 *
	 */
	showConfig: function() {
		if (!this.viewConfig) {

			this.viewConfig = this.render({
				xtype: 'App.View.Config'

			});

			this.viewConfig.query('#backButton')[0].on(
				'tap',
				this.showChat,
				this
			);
		}
		this.application.viewport.setActiveItem(
			this.viewConfig,
			{
				type: 'slide',
				direction: 'left'
			}
		);
	}
});