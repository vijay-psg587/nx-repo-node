import { Injectable, Scope } from '@nestjs/common';
import {defaultProvider} from '@aws-sdk/credential-provider-node'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppUtilService } from 'libs/common/src/lib/services/app-util/app-util.service';
import { AWSCredConfigModel } from '../../models/aws-cred-config.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { APP_CONST } from 'libs/common/src/lib/utils/app-constants';
import * as fs from 'fs';
import * as path from 'path';
@Injectable({scope: Scope.DEFAULT})
export class SqUtilService {
    static defaultCredentialsProvider
    constructor() {
        SqUtilService.defaultCredentialsProvider = null;
    }
    static getCredentials() {
        const localStackModel = SqUtilService.createAwsCredModel()
        if(localStackModel ) {
            if(!SqUtilService.defaultCredentialsProvider) {
                SqUtilService.defaultCredentialsProvider = defaultProvider({
                    filepath: localStackModel.awsCredFilePath,
                    configFilepath: localStackModel.awsConfigFilePath,
                    policy: localStackModel.policy,
                    maxRetries: localStackModel.masRetries,
                    profile: localStackModel.awsProfile
                    
                })
            }
           return SqUtilService.defaultCredentialsProvider;
        } else {
           return defaultProvider();
        }
        
    }

    static createAwsCredModel() {
        // for local get localstack credentials
        if(AppUtilService.isLocalDev()) {
            const localStackModel  = new AWSCredConfigModel();
            localStackModel.awsConfigFilePath = APP_CONST.COMMON.LOCAL.AWS_CONFIG_FILE_PATH;
            localStackModel.awsCredFilePath = APP_CONST.COMMON.LOCAL.AWS_CRED_FILE_PATH;
            localStackModel.masRetries = 5;
            localStackModel.awsProfile = 'localstack';
            // for now assume admin role
            console.log('process.cwd', process.cwd())
            console.log('__dirname', __dirname)
            localStackModel.policy = fs.readFileSync(path.join(process.cwd(), './apps/assets/localstack/iam/admin-role.json')).toString('utf-8')
            return localStackModel;
        } else {
            return null;
        }
    }
}
