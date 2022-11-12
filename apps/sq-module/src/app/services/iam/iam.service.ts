import { Injectable, Scope } from '@nestjs/common';
import { AWSClientService } from '../aws-client/aws-client.service';
import { IAMClient, ListGroupsCommand, ListRolesCommand } from '@aws-sdk/client-iam';
import { LoggingDecorator } from '../../decorators/log.decorator';
import { CustomErrorModel } from '@nest-sls-monorepo/common';
import { AppUtilService } from '@nest-sls-monorepo/common';
import { ErrorTypeEnum } from '@nest-sls-monorepo/common';

@Injectable({ scope: Scope.REQUEST })
export class IamService {
	iamClient: IAMClient = null;

	constructor(private awsClientService: AWSClientService) {
		this.iamClient = this.awsClientService.createIamClient();
	}

	@LoggingDecorator('getUserGroups', 'IamService')
	async getUserGroups() {
		const command = new ListGroupsCommand({});
		return await this.iamClient.send(command).catch((err) => {
			let customErr = err;
			if (!(err instanceof CustomErrorModel)) {
				customErr = AppUtilService.createCustomError(ErrorTypeEnum.AWS_ERROR, err.message, err.code ?? 500, '500');
			}
			throw customErr;
		});
	}

	@LoggingDecorator('listAllIamRoles', 'IamService')
	async listAllIamRoles() {
		const command = new ListRolesCommand({});
		const result = await this.iamClient.send(command).catch((err) => {
			let customErr = err;
			if (!(err instanceof CustomErrorModel)) {
				customErr = AppUtilService.createCustomError(ErrorTypeEnum.AWS_ERROR, err.message, err.code ?? 500, '500');
			}
			throw customErr;
		});
		throw new Error('test errir');
		return result;
	}
}
