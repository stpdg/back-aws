import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class BackAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    const api = new apigateway.RestApi(this, 'products-api', {
      restApiName: 'api',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ["*"],
        allowCredentials: true,
      }
    });

    const productsApi = api.root.addResource('products');
    const productIdApi = productsApi.addResource('{productId}');


    productsApi.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getProductsList)
    );

    productIdApi.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getProductsById)
    );
  }
}