import { Module } from '@nestjs/common';
import { AppConfigService } from './services/app-config/app-config.service';
import { AppUtilService } from './services/app-util/app-util.service';

@Module({
	controllers: [],
	providers: [AppConfigService, AppUtilService],
	exports: [],
})
export class CommonModule {}
