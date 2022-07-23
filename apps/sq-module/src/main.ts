import { INestApplication, INestApplicationContext, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CommonModule } from 'libs/common/src';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppConfigService } from 'libs/common/src/lib/services/app-config/app-config.service';
import 'reflect-metadata';
import { AppModule } from './app/app.module';

let app;
async function bootstrap() {
	
		app = await NestFactory.createApplicationContext(AppModule);
		try {
			await app.select(CommonModule).get(AppConfigService);
			const appConfigModel = AppConfigService.getAppConfigModel();
			console.log("POrt",appConfigModel.port);
		
		} catch (err) {
			console.log('errr here:', err);
			app.close()
				.then(() => {
					process.stdout.write('Shuttingdown the app...');
					process.exit(1);
				})
				.catch((err) => {
					process.stderr.write('Error in shutting down the app...Initating immediate shutdown', err.message);
					process.exit(1);
				});
		}
	
}
process.on('SIGINT', async () => {
	process.stdout.write('Caught unhandled Rejection. Please correct the code. Shutting down...');
	await app.close().catch((err) => {
		process.stderr.write('Error closing the app: Shutting down the app immediately', err);
		process.exit(1);
	});
});
process.on('unhandledRejection', () => {
	process.stdout.write('Caught unhandled Rejection. Please correct the code. Shutting down...');
	process.exit(1);
});

bootstrap();
