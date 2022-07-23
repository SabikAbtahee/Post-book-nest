export interface Token {
	access_token: string;
	refresh_token: string;
}

export interface AccessToken{
	access_token: string;

}

export interface AccessTokenPayload extends JwtPayload {
	id: string;
	sub: string;
	UserName: string;
	Email: string;
	Roles: string[];
}

export interface RefreshTokenPayload extends JwtPayload {
	id: string;
	sub: string;

}

export interface JwtPayload {
	iat?: number;
	exp?: number;
}
