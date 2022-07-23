import { AppUtilService } from '../../services/app-util/app-util.service';
import { ErrorTypeEnum } from '../enums/error-type.enum';
import { CustomErrorModel } from '../errors/custom-error.model';

export class CustomErrorModelBuilder {
	private customErrorModel: CustomErrorModel;
	constructor() {
		this.customErrorModel = new CustomErrorModel();
	}

	setStatus(status: string): CustomErrorModelBuilder {
		this.customErrorModel.status = status;
		return this;
	}

	setCode(code: number): CustomErrorModelBuilder {
		this.customErrorModel.code = code;
		return this;
	}

	setErrorType(errType: ErrorTypeEnum): CustomErrorModelBuilder {
		this.customErrorModel.errType = errType;
		return this;
	}

	setMessage(message: string): CustomErrorModelBuilder {
		this.customErrorModel.message = message;
		return this;
	}

	setTz(): CustomErrorModelBuilder {
		this.customErrorModel.timestamp = AppUtilService.getCurrentTimestamp();
		return this;
	}

	build(): CustomErrorModel {
		return this.customErrorModel;
	}
}
