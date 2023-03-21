import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService, ErrorMessages } from '@shared';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class EmailService {
	constructor(private mailService: MailerService, private configService: ConfigService) {}

	async sendEmail(to: string, subject: string, text: string): Promise<SentMessageInfo> {
		return await this.mailService
			.sendMail({
				to: to,
				from: this.configService.get('MailSenderEmail'),
				subject: subject,
				text: text
			})
			.catch((err) => {
				console.log(err);
				throw new HttpException(
					ErrorMessages.ResetPasswordEmailNotSent,
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			});
	}
}
