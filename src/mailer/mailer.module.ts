import { Module } from '@nestjs/common';
import { EmailService } from './services/mailer/mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as sendinblueTransport from 'nodemailer-sendinblue-transport';
import { environment } from '@environment';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: new sendinblueTransport({
				apiKey: environment.MailApiKey
			})
		})
	],
	exports: [EmailService],
	providers: [EmailService]
})
export class MailModule {}
