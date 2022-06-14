import { environment } from '@environment';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

function configureSwagger(app) {
	const config = new DocumentBuilder()
		.setTitle(environment.Title)
		.setDescription(environment.Description)
		.setVersion(environment.Version)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(environment.SwaggerUrl, app, document);
}

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	configureSwagger(app);

	await app.listen(environment.Port);
}
bootstrap();
