Ext.ns('App.View');

/**
 * Config View
 *
 * @class App..ViewConfig
 * @namespace App.View
 * @extends Ext.form.FormPanel
 * @author Nils Dehl <mail@nils-dehl.de>
 */
App.View.Config = Ext.extend(Ext.form.FormPanel, {

	// privat
	initComponent: function() {
		this.store = Ext.StoreMgr.get('ConfigStore');
		this.store.load();

		var config = {
			fullscreen: true,
			scroll: 'vertical',
			defaults: {

			},
			items: [
				{
					xtype: 'textfield',
					name : 'nickname',
					label: 'Nickname',
					placeHolder: 'nickname83'
				},
				{
					xtype: 'emailfield',
					name : 'email',
					label: 'Gravatar',
					placeHolder: 'gravatar@email-adress.com'
				},
				{
					xtype: 'textfield',
					name : 'server',
					label: 'Server',
					placeHolder: '192.168.178.50',
					listeners: {
						blur: function(field){
							Ext.Viewport.scrollToTop();
						}
					}
				}
			],
			dockedItems: [
				{
					dock: 'top',
					title: 'Settings',
					xtype: 'toolbar',
					items: [
						{
							ui: 'back',
							text: 'back',
							itemId: 'backButton'
						}
					]
				},
				{
					dock: 'top',
					xtype: 'panel',
					itemId: 'gravatar',
					html: '<img src="http://www.gravatar.com/avatar/?s=80&d=mm" height="80"/>',
					tpl: '<img src="http://www.gravatar.com/avatar/{gravatar}?s=80&d=mm"  height="80"/>'
				},
				{
					dock: 'bottom',
					xtype: 'toolbar',
					items: [

						{
							xtype: 'spacer'
						},
						{
							xtype: 'button',
							text: 'save',
							handler: this.saveAction,
							scope: this
						}
					]
				}
			]
		};
		Ext.apply(this, config);
		App.View.Config.superclass.initComponent.call(this);
		this.addEventListener();
	},

	/**
	 * Add custom event listener
	 */
	addEventListener: function(){
		this.on(
			'activate',
			this.loadSettings,
			this
		);
	},

	/**
	 * load user settings from store in the form
	 */
	loadSettings: function(){
		var conf = this.store.getAt(0);
		if (Ext.isObject(conf)) {
			this.load(conf);
			this.updateGravatarImg(conf);
		}
	},

	/**
	 * Save form user settings model in store
	 */
	saveAction: function() {
		var data = this.getValues();
		var conf = Ext.ModelMgr.create({
				nickname: data.nickname,
				email: data.email,
				gravatar: Ext.util.MD5(data.email),
				server: data.server
			},
			'Config'
		);
		this.updateGravatarImg(conf);
		this.store.removeAt(0);
		this.store.sync();
		this.store.add(conf);
		this.store.sync();
	},

	/**
	 * update the panel with the gravatar image
	 *
	 * @param {Object} Settings conf model
	 */
	updateGravatarImg: function(confModel){
		var panel = this.getComponent('gravatar');
		panel.update(confModel.data);
	}
});
Ext.reg('App.View.Config', App.View.Config);