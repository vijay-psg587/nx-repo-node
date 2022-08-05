/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ErrorTypeEnum } from 'libs/common/src/lib/models/enums/error-type.enum';
import { CustomErrorModel } from 'libs/common/src/lib/models/errors/custom-error.model';
import { AppUtilService } from 'libs/common/src/lib/services/app-util/app-util.service';

@Catch()
export class CustomExceptionFilter<T> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {
		console.log('host type jere:', host.getType());
		if (exception instanceof CustomErrorModel) {
			// we are already good with what we have, just send it out
			return exception;
		} else {
			// convert that to customErrorModel
			return AppUtilService.createCustomError(ErrorTypeEnum.INTERNAL_SERVER_ERROR, exception['message'], 500, '500');
		}
	}
}
