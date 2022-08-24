import { environment } from '@environment';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RolesGuard } from '@shared';
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
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
	// app.useGlobalGuards(new RolesGuard(new Reflector()));
	configureSwagger(app);
	app.enableCors({
		origin: environment.Origin,
		credentials: true,
		preflightContinue: false,
		optionsSuccessStatus: 204
	});
	await app.listen(environment.Port);
}
bootstrap();
