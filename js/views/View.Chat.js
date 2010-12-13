Ext.ns('App.View');

/**
 * View Chat
 *
 * @class App.View.Chat
 * @namespace App.View
 * @extends Ext.Panel
 * @author Nils Dehl <mail@nils-dehl.de>
 */
App.View.Chat = Ext.extend(Ext.Panel, {

	// privat
	initComponent: function() {
		this.store = Ext.StoreMgr.get('ChatStore');
		var config = {
			layout: 'fit',
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					layout: 'fit',
					title: 'Chat',
					items: [
						{
							xtype: 'spacer'
						},
						{
							iconMask: true,
							ui: 'plain',
							iconCls: 'settings',
							itemId: 'settingsButton'
						}
					]
				},
				{
					xtype: 'toolbar',
					dock: 'bottom',
					itemId: 'msgToolbar',
					layout: 'fit',
					items: [
						{
							xtype: 'textfield',
							width: '96%',
							listeners: {
								blur: function(field){
									Ext.Viewport.scrollToTop();
									//Ext.Viewport.updateBodySize();
									App.fireEvent('newMsg', field.getValue());
									field.reset();

									//field.focus();
								}
							}
						}
					]
				}
			],
			items: [
				{
					xtype: 'list',
					itemId: 'chatList',
					itemTpl : new Ext.XTemplate(
						'<tpl if="xindex % 2 === 0">',
						'	<img class="odd" src="http://www.gravatar.com/avatar/{gravatar}?s=28&d=mm" />',
						'	<p class="triangle-right left"><span class="nickname">{nickname}:</span> {message}</p>',
						'</tpl>',
						'<tpl if="xindex % 2 === 1">',
						'	<p class="triangle-right right"><span class="nickname">{nickname}:</span> {message}</p>',
						'	<img class="even" src="http://www.gravatar.com/avatar/{gravatar}?s=28&d=mm" />',
						'</tpl>'
					),
					store: this.store,
					scroll: 'vertical'

				}
			]

		};
		Ext.apply(this, config);
		App.View.Chat.superclass.initComponent.call(this);
		this.addEventListener();
	},

	/**
	 * Add custom event listener
	 */
	addEventListener: function() {
		this.store.on(
			'datachanged',
			this.scrollToBottom,
			this
		);
	},

	/**
	 * Scroll to the button of the list
	 */
	scrollToBottom: function(){
		var list = this.getComponent('chatList');
		list.scroller.updateBoundary();
		list.scroller.scrollTo({x: 0, y:list.scroller.size.height}, true);
	}
});
Ext.reg('App.View.Chat', App.View.Chat);