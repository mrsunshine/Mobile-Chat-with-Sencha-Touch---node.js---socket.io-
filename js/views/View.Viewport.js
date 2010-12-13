Ext.ns('App.View');

/**
 * Viewport
 *
 * @class App.View.Viewport
 * @namespace App.View
 * @extends Ext.Panel
 * @author Nils Dehl <mail@nils-dehl.de>
 */
App.View.Viewport = Ext.extend(Ext.Panel, {
	id        : 'viewport',
	layout    : 'card',
	fullscreen: true,


	initComponent: function() {
		var config = {};
		Ext.apply(this, config);
		App.View.Viewport.superclass.initComponent.call(this);

		this.addEventListener();
	},

	/**
	 * Add custom eventlistener to the component
	 *
	 * @return {void}
	 */
	addEventListener: function() {

		this.on(
			'afterrender',
			this.removeLoadingMask,
			this
		);
	},

	/**
	 * remove the loadingmask div from dom
	 */
	removeLoadingMask: function() {

		var loadmask = Ext.get('pre-loading-mask');
		if (loadmask) {
			Ext.Anim.run(loadmask, 'fade', {
				easing: 'out',
				duration: 500,
				after: function() {
					loadmask.remove();
				}
			});
		}
	}
});

Ext.reg('App.View.Viewport', App.View.Viewport);