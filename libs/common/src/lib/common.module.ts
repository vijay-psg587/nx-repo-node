import { Module } from '@nestjs/common';
import { AppConfigService } from './services/app-config/app-config.service';
import { AppUtilService } from './services/app-util/app-util.service';
import { LoggerService } from './services/logger/logger.service';

@Module({
	controllers: [],
	providers: [AppConfigService, AppUtilService, LoggerService],
	exports: [AppConfigService, AppUtilService, LoggerService],
})
export class CommonModule {}
