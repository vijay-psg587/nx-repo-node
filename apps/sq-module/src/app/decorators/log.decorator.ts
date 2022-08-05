// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppUtilService } from 'libs/common/src/lib/services/app-util/app-util.service';
import 'reflect-metadata';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ErrorTypeEnum } from 'libs/common/src/lib/models/enums/error-type.enum';
export function LoggingDecorator(methodName: string, className: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const infoLogger = AppUtilService.getLogger('info', 'contextId', methodName, 'sq-module', false);
		const errLogger = AppUtilService.getLogger('error', 'contextId', methodName, 'sq-module', false);
		// const debugLogger = AppUtilService.getLogger("debug", "contexId")
		const originalMethod = descriptor.value;
		descriptor.value = async function (...args) {
			const start = performance.now();
			infoLogger.info(`Start of the execution:class:${className}:method:${methodName}:with args:${args}`);
			const finish = performance.now();
			try {
				const result = await originalMethod.apply(this, args);
				infoLogger.info(`End of the execution:class:${className}:method:${methodName} - Execution time: ${finish - start} milliseconds`);
				return Promise.resolve(result);
			} catch (err) {
				const customErr = AppUtilService.createCustomError(ErrorTypeEnum.INTERNAL_SERVER_ERROR, err.message, 500, '500');
				errLogger.error(`Error in the class:${className}:method:${methodName}:args:${args}: error: ${customErr}`);
				return Promise.reject(customErr);
			}
		};
		// return newProxy(target)
	};
}
