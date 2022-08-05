import { Injectable } from '@nestjs/common';
import { classToPlain, instanceToPlain } from 'class-transformer';
import { AppConfigModel } from '../../models/app-config.model';
import { APP_CONST } from '../../utils/app-constants';

@Injectable()
export class AppConfigService {
	static appConfigModel;
	// constructor(){

	// }

	static getAppConfigModel(): AppConfigModel {
		if (!this.appConfigModel) {
			this.appConfigModel = new AppConfigModel();
			this.appConfigModel.host = process.env.APP_HOST ?? APP_CONST.COMMON.DEFAULT_HOST;
			this.appConfigModel.port = process.env.APP_PORT ? +process.env.APP_PORT : APP_CONST.COMMON.DEFAULT_PORT;
		}
		return this.appConfigModel;
	}
}
