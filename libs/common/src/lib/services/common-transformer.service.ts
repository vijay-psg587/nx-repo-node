import { Injectable, Scope } from '@nestjs/common';
import { APP_CONST } from '../utils/app-constants';
import * as dateFns from 'date-fns';
import * as Locale from 'date-fns/locale';
@Injectable({ scope: Scope.DEFAULT })
export class CommonTransformerService {
	static convertFn = <T, V>(strVal: T, key?: string, obj?: V) => {
		if (typeof strVal === 'string') {
			// convert to integer
			const parsedDate = dateFns.parse(strVal, APP_CONST.COMMON.DEFAULT_DATE_TIME_FORMAT, new Date());
			if (dateFns.isValid(parsedDate)) {
				// make sure to return a proper formatted timestamp
				return dateFns.format(parsedDate, APP_CONST.COMMON.DEFAULT_DATE_TIME_FORMAT, { locale: Locale.enUS });
			} else {
				// we can be sure that this is just a transformation applied over a string that needed number conv
				return +strVal;
			}
		} else if (typeof strVal === 'number' || typeof strVal === 'bigint') {
			return strVal;
		}
		return strVal;
	};
}
