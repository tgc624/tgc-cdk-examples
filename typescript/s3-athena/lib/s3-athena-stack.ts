import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as athena from "aws-cdk-lib/aws-athena";

import * as glue from "@aws-cdk/aws-glue-alpha";

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

    // Glueデータベースを作成
    const database = new glue.Database(this, "AthenaGlueDatabase", {
      databaseName: "test_db",
    });

    // Glueテーブルを作成
    // https://docs.aws.amazon.com/cdk/api/v2/docs/@aws-cdk_aws-glue-alpha.S3Table.html
    const table = new glue.S3Table(this, "AthenaGlueTable", {
      database,
      tableName: "postcodes",
      columns: [
        { name: "code", type: glue.Schema.INTEGER },
        { name: "post_code_5", type: glue.Schema.STRING },
        { name: "post_code_7", type: glue.Schema.INTEGER },
        { name: "prefecture_name_kana", type: glue.Schema.STRING },
        { name: "city_name_kana", type: glue.Schema.STRING },
        { name: "town_name_kana", type: glue.Schema.STRING },
        { name: "prefecture_name", type: glue.Schema.STRING },
        { name: "city_name", type: glue.Schema.STRING },
        { name: "town_name", type: glue.Schema.STRING },
        { name: "a", type: glue.Schema.INTEGER },
        { name: "b", type: glue.Schema.INTEGER },
        { name: "c", type: glue.Schema.INTEGER },
        { name: "d", type: glue.Schema.INTEGER },
        { name: "e", type: glue.Schema.INTEGER },
        { name: "f", type: glue.Schema.INTEGER },
      ],
      partitionKeys: [],
      dataFormat: glue.DataFormat.CSV,
      s3Prefix: "tables/test_db/postcodes/",
      bucket,
      compressed: true,
      storageParameters: [
        glue.StorageParameter.skipHeaderLineCount(0),
        glue.StorageParameter.compressionType(glue.CompressionType.GZIP),
        glue.StorageParameter.custom("separatorChar", ","),
      ],
    });

    // Athena Workgroupを作成
    const workgroup = new athena.CfnWorkGroup(this, "AthenaWorkgroup", {
      name: "sample-workgroup",
      workGroupConfiguration: {
        resultConfiguration: {
          outputLocation: `s3://${BUCKET_NAME}/query-results/`,
        },
      },
    });
  }
}
