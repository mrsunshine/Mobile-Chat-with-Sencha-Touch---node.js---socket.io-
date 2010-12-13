/**
 * @author Nils Dehl  <mail@nils-dehl.de>
 */
Ext.regApplication('App', {
	defaultTarget: 'viewport',
	defaultUrl   : 'Viewport/index',
	name         : 'App',
	useHistory   : false,
	useLoadMask : true,

	launch: function() {
		Ext.Viewport.init();
		Ext.Viewport.onOrientationChange();

		this.viewport = new App.View.Viewport({
			application: this
		});

		Ext.dispatch({
			controller: 'Viewport',
			action    : 'index'
		});
	}
});

