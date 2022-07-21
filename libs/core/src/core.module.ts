import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { LoggerModule } from './logger/logger.module';

@Module({
	providers: [CoreService],
	exports: [CoreService],
	imports: [LoggerModule],
})
export class CoreModule {}
