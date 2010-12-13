/**
 * User Config Model
 *
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.regModel('Config', {
	fields: [
		{
			name: 'server',
			type: 'string'
		},
		{
			name: 'nickname',
			type: 'string'
		},
		{
			name: 'email',
			type: 'string'
		},
		{
			name: 'gravatar',
			type: 'string'
		}
	],

	proxy: {
		type: 'localstorage',
		id  : 'chat-settings'
	}

});