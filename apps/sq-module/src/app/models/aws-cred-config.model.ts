import { Expose } from "class-transformer";

export class AWSCredConfigModel {

    @Expose({name: 'profile'})
    awsProfile:string;

    @Expose({name: 'filePath'})
    awsCredFilePath:string;

    @Expose({name:'configFilePath'})
    awsConfigFilePath:string;

    @Expose()
    policy?:string;

    @Expose()
    policyArn?:string

    @Expose()
    roleArn?:string

    @Expose()
    masRetries?: number
}