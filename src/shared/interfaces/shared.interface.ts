export interface Comments {
	Commentor: string;
	Comment: string;
	Time: Date;
}

export interface Chapter {
	Title: string;
	Description: string;
	VideoSourceLink: string;
}

export interface ResetPasswordLinkResponse {
	MessageId: string;
	Success: boolean;
	Error?: string;
}
