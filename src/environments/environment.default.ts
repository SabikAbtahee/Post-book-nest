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
    TokenExpirationTimeInSeconds:60*15
};
export const DatabaseConnectionString = `mongodb://localhost:${environmentDefault.DatabasePort}/${environmentDefault.DataBaseName}`;
