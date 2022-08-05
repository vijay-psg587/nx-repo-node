import { Module } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CommonModule } from 'libs/common/src';

import { AppService } from './app.service';
import { AWSClientService } from './services/aws-client/aws-client.service';
import { DynamodbService } from './services/dynamodb/dynamodb.service';
import { SqUtilService } from './services/sq-util/sq-util.service';
import { IamService } from './services/iam/iam.service';

@Module({
	imports: [CommonModule],
	providers: [AppService, AWSClientService, DynamodbService, SqUtilService, IamService],
})
export class AppModule {}
