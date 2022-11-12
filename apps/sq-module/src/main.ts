import { INestApplicationContext } from '@nestjs/common';
import { ContextIdFactory, NestFactory } from '@nestjs/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CommonModule } from '@nest-sls-monorepo/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppConfigService } from '@nest-sls-monorepo/common';
import 'reflect-metadata';
import { AppModule } from './app/app.module';
import { Context } from 'aws-lambda';
import { AppService } from './app/app.service';
import 'source-map-support/register';
let app: INestApplicationContext;

export async function bootstrap() {
	app = await NestFactory.createApplicationContext(AppModule);
	app.useLogger(false);

	try {
		if (process.env.IS_LOCAL_DEBUG_ENABLED && process.env.IS_LOCAL_DEBUG_ENABLED === 'true') {
			await app.select(CommonModule).get(AppConfigService);

			const appConfigModel = AppConfigService.getAppConfigModel();
			process.stdout.write(JSON.stringify(appConfigModel));
			const contextId = ContextIdFactory.create();
			// Use this context object in all required places by Importing as Context
			const context: Context = {
				callbackWaitsForEmptyEventLoop: false,
				functionName: '',
				functionVersion: '',
				invokedFunctionArn: '',
				memoryLimitInMB: '',
				awsRequestId: '',
				logGroupName: '',
				logStreamName: '',
				getRemainingTimeInMillis: function (): number {
					throw new Error('Function not implemented.');
				},
				done: function (error?: Error, result?: any): void {
					throw new Error('Function not implemented.');
				},
				fail: function (error: string | Error): void {
					throw new Error('Function not implemented.');
				},
				succeed: function (messageOrObject: any): void {
					throw new Error('Function not implemented.');
				},
			};
			app.registerRequestByContextId(context, contextId);
			const appService = await app.select(AppModule).resolve(AppService);
			appService.getData();
			//await appService.getTableList();
			//await appService.getUserGroups();
			// await appService.listAllIamRoles();
			//await appService.describeDynamoDbTable();
		}
		return app;
	} catch (err) {
		process.stderr.write('Error in the application:', err);
		app.close()
			.then(() => {
				process.stdout.write('Shutting down the app...');
				process.exit(1);
			})
			.catch((err) => {
				process.stderr.write('Error in shutting down the app...Initiating immediate shutdown', err.message);
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

// Trigger in local
if (process.env.IS_LOCAL_DEBUG_ENABLED === 'true') {
	bootstrap();
}
