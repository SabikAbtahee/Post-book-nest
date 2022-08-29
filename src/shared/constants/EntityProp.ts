import { EntityNamesClass } from './Entities';

export const UserReadables = {
	[EntityNamesClass.User]: ['UserName', 'Password', 'Roles', 'Email', 'RefreshTokenHash'],
	UserPublic: ['UserName', 'Roles', 'Email'],
	[EntityNamesClass.Post]: [
		'Title',
		'Description',
		'Author',
		'LastUpdateDate',
		'Status',
		'Comments',
		'Likes'
	],
	[EntityNamesClass.Course]: ['Title', 'Description','Chapters']
};
