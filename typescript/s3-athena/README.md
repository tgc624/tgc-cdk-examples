# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## データの準備

- <https://www.post.japanpost.jp/zipcode/dl/utf-zip.html>からデータを取得します。ローカルにて`zip`を解凍して、`gzip`形式で再圧縮します
   - コマンド: `gzip utf_ken_all.csv`
- 作成されたS3に格納します
   - 格納パス: `s3://cdk-athena-sample-bucket/tables/test_db/postcodes/utf_ken_all.csv.gz`

## Athenaクエリ方法
- AWSコンソールへ行き、ワークグループを`sample-workgroup`に設定します
- 適当なSQLを実行します ex: `select * from test_db.postcodes limit 10`


## 上手くいかなかったこと

- ローカルでgzipファイルに再圧縮しました。これはそのままのzipファイルでは上手くテーブルを作成できなかったためです。おそらく圧縮形式の設定がいまいちなんだと思いますがが、どう直せば良いか分かりませんでした。
- Athenaにて、`SHOW CREATE TABLE test_db.postcodes;`を実行するとエラーとなりました。謎。
  - エラー文: `FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.DDLTask. java.lang.NullPointerException: Cannot invoke "java.util.Map.entrySet()" because the return value of "org.apache.hadoop.hive.metastore.api.SerDeInfo.getParameters()" is null`

## 感想
- テーブル生成は、cdkではなくcreate tableで作ったほうが良いかもしれないです。
  - refs: <https://docs.aws.amazon.com/ja_jp/athena/latest/ug/create-table.html>