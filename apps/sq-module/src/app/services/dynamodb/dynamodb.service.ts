import { DescribeTableCommand, DescribeTableCommandOutput, DynamoDB, ListTablesCommand, ListTablesCommandOutput } from '@aws-sdk/client-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ErrorTypeEnum } from 'libs/common/src/lib/models/enums/error-type.enum';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CustomErrorModel } from 'libs/common/src/lib/models/errors/custom-error.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppUtilService } from 'libs/common/src/lib/services/app-util/app-util.service';
import { LoggingDecorator } from '../../decorators/log.decorator';
import { AWSClientService } from '../aws-client/aws-client.service';
import { REQUEST } from '@nestjs/core';
import { Context } from 'aws-lambda';

@Injectable()
export class DynamodbService {
	dynamoDBClient: DynamoDB = null;

	constructor(@Inject(REQUEST) private context: Context, private readonly awsClient: AWSClientService) {
		this.dynamoDBClient = this.awsClient.createDynamoDbClient();
	}

	/**
	 * This method lists all values in table displayed
	 */
	@LoggingDecorator('listAllTables', 'DynamoDB')
	async listAllTables(): Promise<ListTablesCommandOutput | CustomErrorModel> {
		return await this.dynamoDBClient.send(new ListTablesCommand({})).catch((err) => {
			let customErr = err;
			if (!(err instanceof CustomErrorModel)) {
				customErr = AppUtilService.createCustomError(ErrorTypeEnum.AWS_ERROR, err.message, err.code ?? 500, '500');
			}
			throw customErr;
		});
	}

	@LoggingDecorator('describeTable', 'DynamoDB')
	async describeTable(tableName: string): Promise<DescribeTableCommandOutput | void> {
		return await this.dynamoDBClient.send(new DescribeTableCommand({ TableName: tableName })).catch((err) => {
			let customErr = err;
			if (!(err instanceof CustomErrorModel)) {
				customErr = AppUtilService.createCustomError(ErrorTypeEnum.AWS_ERROR, err.message, err.code ?? 500, '500');
			}
			throw customErr;
		});
	}
}
