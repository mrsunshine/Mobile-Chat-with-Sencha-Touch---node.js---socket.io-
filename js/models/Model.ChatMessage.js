/**
 * Chat Message Model
 *
 * @author Nils Dehl <mail@nils-dehl.de>
 */
Ext.regModel('ChatMessage', {
	fields: [
		{
			name: 'user',
			type: 'string'
		},
		{
			name: 'message',
			type: 'string'
		}
	]
});