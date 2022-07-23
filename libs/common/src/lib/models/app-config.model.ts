import { Expose, Transform } from 'class-transformer';
import { AppUtilService } from '../services/app-util/app-util.service';
import { CommonTransformerService } from '../services/common-transformer.service';

export class AppConfigModel {
	@Expose()
	@Transform(({ value, key, obj }) => CommonTransformerService.convertFn<string, Record<string, any>>(<string>value, key, obj))
	public port?: number;

	@Expose()
	public host?: string;
}
