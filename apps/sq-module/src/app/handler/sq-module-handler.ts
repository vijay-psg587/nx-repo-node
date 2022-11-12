import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { DynamoDBClient, paginateListTables } from '@aws-sdk/client-dynamodb';
import { bootstrap } from '../../main';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppConfigService } from '@nest-sls-monorepo/common';
import { INestApplicationContext } from '@nestjs/common';

import { AppService } from '../app.service';
import { ContextIdFactory } from '@nestjs/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CustomErrorModel } from '@nest-sls-monorepo/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppUtilService } from '@nest-sls-monorepo/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ErrorTypeEnum } from '@nest-sls-monorepo/common';

export const lambdaHandler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
	console.log(`Event: ${JSON.stringify(event, null, 2)}`);
	console.log(`Context: ${JSON.stringify(context, null, 2)}`);

	try {
		// get the app here:
		const app: INestApplicationContext = await bootstrap();
		/**
		 * Instantiate a request-scoped DI sub-tree and obtain the request-scoped top-level injectable
		 */
		const contextId = ContextIdFactory.create();
		// Use this context object in all required places by Importing as Context
		app.registerRequestByContextId({ context }, contextId);
		const appConfigModel = AppConfigService.getAppConfigModel();
		console.log('POrt', appConfigModel.port);
		const appService = await app.resolve<AppService>(AppService, contextId);
		appService.getData();
		appService.listAllIamRoles();
		// call to aws ssm param store to get environment vars
		// get aws ssm param
		// call GithubAPI
		callback(null, {
			statusCode: 200,
			body: JSON.stringify({
				message: 'hello world',
			}),
		});
	} catch (err) {
		process.stderr.write('Error in lambda function', err.message);
		let customErrModel: CustomErrorModel = null;
		if (!(err instanceof CustomErrorModel)) {
			customErrModel = AppUtilService.createCustomError(ErrorTypeEnum.INTERNAL_SERVER_ERROR, err.message, 500, '500');
		}
		callback(JSON.stringify(customErrModel), null);
	}
};
