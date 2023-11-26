import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as iam from "aws-cdk-lib/aws-iam";


export class BackAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamoRole = new iam.Role(this, "dynamoRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      inlinePolicies: {
        dynamoDBAccessPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                "dynamodb:Scan",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
              ],
              resources: [
              ],
            }),
          ],
        }),
      },
    });



    const getProductsList = new NodejsFunction(this, 'GetProductsList', {
      functionName: 'getProductsList',
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'src/lambdas/getProductList.ts',
    });

    const getProductsById = new NodejsFunction(this, 'GetProductsById', {
      functionName: 'getProductsById',
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'src/lambdas/getProductById.ts',
    });

    const api = new apigateway.RestApi(this, 'api-product', {
      restApiName: 'api',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['*'],
        allowCredentials: true,
      },
    });

    const prodApi = api.root.addResource('products');
    const prodId = prodApi.addResource('{productId}');

    prodApi.addMethod('GET', new apigateway.LambdaIntegration(getProductsList));

    prodId.addMethod('GET', new apigateway.LambdaIntegration(getProductsById));
  }
}
