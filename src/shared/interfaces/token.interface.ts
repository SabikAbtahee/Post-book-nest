export interface Token {
	access_token: string;
	refresh_token: string;
}

export interface AccessTokenPayload{
    sub:string;
    UserName:string;
    Email:string;
    Roles:string[];
}