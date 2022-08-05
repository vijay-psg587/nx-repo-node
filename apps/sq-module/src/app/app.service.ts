import { ExecutionContext, Inject, Injectable, Scope } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppUtilService } from 'libs/common/src/lib/services/app-util/app-util.service';
import { LoggingDecorator } from './decorators/log.decorator';
import { DynamodbService } from './services/dynamodb/dynamodb.service';
import pino from 'pino';
import { Context } from 'aws-lambda';
import { SQ_CONST } from './utils/sq-module.constants';
import { INQUIRER, REQUEST } from '@nestjs/core';
import { IamService } from './services/iam/iam.service';
@Injectable({ scope: Scope.REQUEST })
export class AppService {
	infoLogger: pino.Logger;
	errorLogger: pino.Logger;
	debugLogger: pino.Logger;
	constructor(@Inject(REQUEST) private context: Context, private iamService: IamService, private dyService: DynamodbService, @Inject(INQUIRER) private parentClass: object) {
		this.infoLogger = AppUtilService.getLogger('info', context?.clientContext?.Custom?.name, '', SQ_CONST.COMMON.APP_PREFIX);
		this.errorLogger = AppUtilService.getLogger('error', context?.clientContext?.Custom?.name, 'ctx.getClass().name', SQ_CONST.COMMON.APP_PREFIX);
		this.debugLogger = AppUtilService.getLogger('debug', context?.clientContext?.Custom?.name, 'ctx.getClass().name', SQ_CONST.COMMON.APP_PREFIX);
	}
	@LoggingDecorator('getData', 'AppService')
	getData(): { message: string } {
		return { message: 'Welcome to sq-module!' };
	}

	@LoggingDecorator('getTableList', 'AppService')
	async getTableList() {
		const tableList = await this.dyService.listAllTables().catch((err) => {
			this.errorLogger.error(err, err.message);
			throw err;
		});
		this.infoLogger.info(`Obtained table list:`, tableList);
		return tableList;
	}

	@LoggingDecorator('getUserGroups', 'UserService')
	async getUserGroups() {
		const iamUsers = await this.iamService.getUserGroups().catch((err) => {
			this.errorLogger.error(err, err.message);
			throw err;
		});
		this.infoLogger.info(`Obtained table list:`, iamUsers);
		return iamUsers;
	}

	@LoggingDecorator('listAllIamRoles', 'UserService')
	async listAllIamRoles() {
		await this.iamService.listAllIamRoles();
	}
	@LoggingDecorator('describeTable', 'UserService')
	async describeDynamoDbTable() {
		await this.dyService.describeTable('loc_table');
	}
}
function CONTEXT(CONTEXT: any) {
	throw new Error('Function not implemented.');
}
