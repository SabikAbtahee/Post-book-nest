import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';
import * as express from 'express';

const server = express();

export const createNestServer = async (instance) => {
	const app = await NestFactory.create(AppModule, new ExpressAdapter(instance));

	return app.init();
};

createNestServer(server)
	.then((v) => console.log('Nest Ready'))
	.catch((err) => console.error('Nest Broken', err));

export const api = functions.https.onRequest(server);
