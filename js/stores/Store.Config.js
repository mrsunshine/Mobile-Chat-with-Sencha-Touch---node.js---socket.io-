/**
 * Config Store
 *
 * @class App.Store.Config
 * @namespace App.Store
 * @extends Ext.data.Store
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.ns('App.Store');
App.Store.Config = Ext.extend(Ext.data.Store, {
	constructor:function(cfg){
		cfg = cfg || {};
		var config = Ext.apply(
			{
				model: 'Config',
				storeId: 'ConfigStore'

			},
			cfg
		);
		App.Store.Config.superclass.constructor.call(
			this,
			config
		);
	}
});
Ext.reg('App.Store.Config', App.Store.Config);