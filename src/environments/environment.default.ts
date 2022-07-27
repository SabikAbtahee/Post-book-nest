export const environmentDefault = {
	Title: 'PostBook',
	Version: '1.0',
	Port: '3000',
	Description: 'Post book description',
	SwaggerUrl: 'swagger',

	DataBaseName: 'PostBook',
	DatabasePort: '27017',
    JwtAccessTokenSecretKey:'5e749e7c-9d77-4244-9224-5fbd4c865a83',
    JwtRefreshTokenSecretKey:'547fc6d1-36d8-4aa5-9060-849fb180bb0f',
    AccessTokenExpirationTimeInSeconds:60*15, //15 Minutes
    RefreshTokenExpirationTimeInSeconds:60*60*24, // 1 Day
    SaltRounds:10,
    PasswordRegex:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,15}$/,
    Origin:'http://postbook.com:4210'
};
export const DatabaseConnectionString = `mongodb://localhost:${environmentDefault.DatabasePort}/${environmentDefault.DataBaseName}`;
