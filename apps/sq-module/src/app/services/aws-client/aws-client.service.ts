import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Injectable, Scope } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppUtilService } from 'libs/common/src/lib/services/app-util/app-util.service';
import { IAMClient } from '@aws-sdk/client-iam';
import { SQ_CONST } from '../../utils/sq-module.constants';

@Injectable({ scope: Scope.DEFAULT })
export class AWSClientService {
	dynamoDBClient = null;
	iamClient = null;
	constructor(private readonly appUtilService: AppUtilService) {}

	createDynamoDbClient(): DynamoDB {
		if (!this.dynamoDBClient) {
			// If its local, use localstack configuration -  from localstack we need to use LOCALSTACK_HOSTNAME
			// the below will be set if localstack is being used in serverless for stage local
			if (process.env.NODE_LOCAL_ENV === 'dev') {
				this.dynamoDBClient = new DynamoDB({ endpoint: SQ_CONST.LOCALSTACK.ENDPOINT, apiVersion: '2012-08-10', region: SQ_CONST.LOCALSTACK.REGION });
			} else {
				// here we dont have to provide that, since the execution is assumed to happen inside lambda/Ec2 or EKS
				this.dynamoDBClient = new DynamoDB({ apiVersion: '2012-08-10' });
			}
			return this.dynamoDBClient;
		}
	}

	createIamClient(): IAMClient {
		if (!this.iamClient) {
			if (AppUtilService.isLocalDev()) {
				this.iamClient = new IAMClient({ endpoint: SQ_CONST.LOCALSTACK.ENDPOINT, region: SQ_CONST.LOCALSTACK.REGION });
			} else {
				this.iamClient = new IAMClient({});
			}
			return this.iamClient;
		} else {
			return this.iamClient;
		}
	}
}
