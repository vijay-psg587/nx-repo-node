/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ErrorTypeEnum } from '@nest-sls-monorepo/common';
import { CustomErrorModel } from '@nest-sls-monorepo/common';
import { AppUtilService } from '@nest-sls-monorepo/common';

@Catch()
export class CustomExceptionFilter<T> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {
		if (exception instanceof CustomErrorModel) {
			// we are already good with what we have, just send it out
			return exception;
		} else {
			// convert that to customErrorModel
			return AppUtilService.createCustomError(ErrorTypeEnum.INTERNAL_SERVER_ERROR, exception['message'], 500, '500');
		}
	}
}
