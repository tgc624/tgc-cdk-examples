import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

const BUCKET_NAME = "cdk-athena-sample-bucket";

export class S3AthenaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3バケットを作成
    const bucket = new s3.Bucket(this, "AthenaGlueBucket", {
      bucketName: BUCKET_NAME,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
