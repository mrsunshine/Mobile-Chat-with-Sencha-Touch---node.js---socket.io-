/**
 * Chat Store
 *
 * @class App.Store.Chat
 * @namespace App.Store
 * @extends Ext.data.Store
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.ns('App.Store');
App.Store.Chat = Ext.extend(Ext.data.Store, {
	constructor:function(cfg){
		cfg = cfg || {};
		var config = Ext.apply(
			{
				model: 'ChatMessage',
				storeId: 'ChatStore'

			},
			cfg
		);
		App.Store.Chat.superclass.constructor.call(
			this,
			config
		);
	}
});
Ext.reg('App.Store.Chat', App.Store.Chat);