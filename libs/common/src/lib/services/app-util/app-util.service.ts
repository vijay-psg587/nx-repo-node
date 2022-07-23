import { Injectable, Scope } from '@nestjs/common';
import { formatInTimeZone } from 'date-fns-tz';
import { APP_CONST } from '../../utils/app-constants';
import * as dateFns from 'date-fns';
import { ErrorTypeEnum } from '../../models/enums/error-type.enum';
import { CustomErrorModel } from '../../models/errors/custom-error.model';
import { CustomErrorModelBuilder } from '../../models/builder/custom-error-model.builder';

@Injectable({ scope: Scope.DEFAULT })
export class AppUtilService {
	// constructor(){}

	static getCurrentTimestamp(_timeZone: string = APP_CONST.COMMON.DEFAULT_TZ): string {
		return formatInTimeZone(Date.now(), _timeZone, APP_CONST.COMMON.DEFAULT_DATE_TIME_FORMAT);
	}

	static isLocalDev(): boolean {
		return process.env.NODE_LOCAL_ENV ? (process.env.NODE_LOCAL_ENV === 'dev' ? true : false) : false;
	}

	static createCustomError(errType: ErrorTypeEnum, message: string, code: number, status: string): CustomErrorModel {
		const customModelBuilder = new CustomErrorModelBuilder();
		return customModelBuilder.setCode(code).setErrorType(errType).setMessage(message).setStatus(status).setTz().build();
	}
}
