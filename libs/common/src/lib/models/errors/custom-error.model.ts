import { Expose, Transform, Type } from 'class-transformer';
import { CommonTransformerService } from '../../services/common-transformer.service';
import { ErrorTypeEnum } from '../enums/error-type.enum';

export class CustomErrorModel {
	@Expose({ name: 'errorType' })
	errType: ErrorTypeEnum;

	@Expose({ name: 'code' })
	code: number;

	@Expose({ name: 'tz' })
	@Transform(({ value, key, obj }) => CommonTransformerService.convertFn<Date, Record<string, string | number | object>>(value, key, obj))
	timestamp: string;

	@Expose({ name: 'status' })
	status: string;

	@Expose()
	message: string;
}
