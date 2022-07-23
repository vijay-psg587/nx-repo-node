import { AppUtilService } from './lib/services/app-util/app-util.service';
import * as path from 'path';
export * from './lib/common.module';
(async function bootstrap() {
	console.log('fdgdfgdInside common module');
	if (AppUtilService.isLocalDev()) {
		
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('dotenv').config({ path: path.join(process.cwd(), '/config/development/.env') });
	}
})();
