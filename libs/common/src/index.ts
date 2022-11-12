import { AppUtilService } from './lib/services/app-util/app-util.service';
import * as path from 'path';
export * from './lib/common.module';
export { AppConfigService } from './lib/services/app-config/app-config.service';
export { AppUtilService } from './lib/services/app-util/app-util.service';
export { LoggerService } from './lib/services/logger/logger.service';
export { APP_CONST } from './lib/utils/app-constants';
export { AppConfigModel } from './lib/models/app-config.model';
export { ErrorTypeEnum } from './lib/models/enums/error-type.enum';
export { CustomErrorModel } from './lib/models/errors/custom-error.model';

(async function bootstrap() {
	if (AppUtilService.isLocalDev()) {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('dotenv').config({ path: path.join(process.cwd(), '/config/development/.env') });
	}
})();
