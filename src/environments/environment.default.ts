export const environmentDefault = {
	Title: 'PostBook',
	Version: '1.0',
	Port: '3000',
	Description: 'Post book description',
	SwaggerUrl: 'swagger',

	DataBaseName: 'PostBook',
	DatabasePort: '27017',
    JwtAccessTokenSecretKey:'SecretJwtAccess',
    JwtRefreshTokenSecretKey:'SecretJwtRefresh',
    AccessTokenExpirationTimeInSeconds:60*15, //15 Minutes
    RefreshTokenExpirationTimeInSeconds:60*60*24, // 1 Day
    SaltRounds:10,
    PasswordRegex:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,15}$/
};
export const DatabaseConnectionString = `mongodb://localhost:${environmentDefault.DatabasePort}/${environmentDefault.DataBaseName}`;
