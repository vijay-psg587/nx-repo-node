import { Injectable, Logger, Scope } from '@nestjs/common';
import pino from 'pino';
import { AppUtilService } from '../app-util/app-util.service';
import * as os from 'os';
@Injectable({ scope: Scope.DEFAULT })
export class LoggerService extends Logger {
	static pinoLogger: pino.Logger;

	static fetchCustomizedLogger(logLevel: pino.Level, reqId: string, name: string, messageKey: string, logDestination: any = process.stdout, isLambda = false) {
		if (!this.pinoLogger) {
			const opts = pino({
				//prettifier: (() => AppUtilService.isLocalDev())(),
				prettifier: true,
				level: logLevel,
				timestamp: () => AppUtilService.getCurrentTimestamp(),
				messageKey: messageKey,
				base: {
					hostname: os.hostname(),
					platform: os.platform(),
					processId: process.pid,
					reqId: reqId,
					fileName: name,
				},
			});
			// for lambda u would need to make sync as true, for docker and other things, we can have sync as false
			// log destination can be any location or process.stdout if left undefined
			this.pinoLogger = pino(opts, pino.destination(logDestination));
		}
		return this.pinoLogger;
	}
}
