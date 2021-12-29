# Step0 - Send Email with Pinpoint

Prefer to use AWS web console to use this service

## Reading Material

- [AWS Pinpoint](https://aws.amazon.com/pinpoint/)
- [AWS Pinpoint CDK Documatation](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-pinpoint-readme.html)
- [AWS Pinpoint API reference](https://docs.aws.amazon.com/pinpoint/latest/apireference/welcome.html)

## Steps to code

1. Create new directory using `mkdir step_00_send_email`.
2. Navigate to newly created directory using `cd step_00_send_email`
3. Create cdk app using `cdk init app --language typescript`
4. Use `npm run watch` to auto transpile the code
5. Install IAM module in the app using `npm i @aws-cdk/aws-iam`. Update "./lib/step_00_send_email-stack.ts" to create a specific role for Lambda function

   ```js
   import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';
   const role = new Role(this, 'LambdaRole', {
     assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
   });
   ```

6. Update "./lib/step_00_send_email-stack.ts" to attach Pinpoint to policy

   ```js
   import { PolicyStatement } from '@aws-cdk/aws-iam';
   role.addToPolicy(
     new PolicyStatement({
       actions: ['mobiletargeting:SendMessages', 'logs:*'],
       resources: ['*'],
     })
   );
   ```

7. Install appSync module in the app using `npm i @aws-cdk/aws-appsync`. Update "./lib/step_00_send_email-stack.ts" to create a graphql api

   ```js
   import * as appsync from '@aws-cdk/aws-appsync';
   const api = new appsync.GraphqlApi(this, 'Api', {
     name: 'Pinpoint-In-Pracitce',
     schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
     authorizationConfig: {
       defaultAuthorization: {
         authorizationType: appsync.AuthorizationType.API_KEY,
         apiKeyConfig: {
           expires: cdk.Expiration.after(cdk.Duration.days(365)),
         },
       },
     },
   });
   ```

8. Create "./graphql/schema.graphql" to define schema

   ```gql
   type Email {
     recipientEmail: String!
   }
   type Mutation {
     createEmail(recipientEmail: String!): Email
   }
   type Query {
     listEmails: [Email]
   }
   ```

9. Install pinpoint module in the app using `npm i @aws-cdk/aws-pinpoint`. Update "./lib/step_00_send_email-stack.ts" to create a pinpoint project

   ```js
   import * as pinpoint from '@aws-cdk/aws-pinpoint';
   const pinpointProject = new pinpoint.CfnApp(this, 'project', {
     name: 'PinpointInPractice',
   });
   ```

10. Update "./lib/step_00_send_email-stack.ts" to enable Email Channel to send emails

    ```js
    const emailChannel = new pinpoint.CfnEmailChannel(this, 'PinpointEmailCh', {
      applicationId: 'PROJECT_ID',
      enabled: true,
      fromAddress: 'EMAIL_ADDRESS',
      identity: 'IDENTITY',
    });
    ```

11. Install lambda module in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step_00_send_email-stack.ts" to create a lambda function

    ```js
    import * as lambda from '@aws-cdk/aws-lambda';
    const Lambda = new lambda.Function(this, 'Pinpoint-In-Pracitce', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main.handler',
      role: role,
      code: lambda.Code.fromAsset('lambda'),
      memorySize: 1024,
    });
    ```

12. Create "./lambda/main.ts" to define lambda handler

    ```js
    const AWS = require('aws-sdk');
    type AppSyncEvent = {
      arguments: {
        recipientEmail: string,
      },
    };
    exports.handler = async (event: AppSyncEvent) => {
      const senderAddress = 'SENDER_ADDRESS';
      var toAddress = event.arguments.recipientEmail;
      const appId = 'PROJECT_ID';
      var subject = 'Amazon Pinpoint In Practice';
      var body_text = `Amazon Pinpoint Test
    ----------------------------------------------------
    This email was sent using Amazon Pinpoint`;
      var body_html = `<html>
    <head></head>
    <body>
    <h1>Amazon Pinpoint Test</h1>
    <p>This email was sent using Amazon Pinpoint</p>
    </body>
    </html>`;
      AWS.config.update({ region: 'us-west-2' });
      var pinpoint = new AWS.Pinpoint({ apiVersion: '2016-12-01' });
      var params = {
        ApplicationId: appId,
        MessageRequest: {
          Addresses: {
            [toAddress]: {
              ChannelType: 'EMAIL',
            },
          },
          MessageConfiguration: {
            EmailMessage: {
              FromAddress: senderAddress,
              SimpleEmail: {
                Subject: {
                  Data: subject,
                },
                HtmlPart: {
                  Data: body_html,
                },
                TextPart: {
                  Data: body_text,
                },
              },
            },
          },
        },
      };
      var publish = await pinpoint.sendMessages(params).promise();
    };
    ```

13. Update "./lib/step_00_send_email-stack.ts" to set lambda as dastasource for the appsync api

    ```js
    const lambdaDs = api.addLambdaDataSource('lambdaDataSource', Lambda);
    ```

14. Update "./lib/step_00_send_email-stack.ts" to defien resolvers

    ```js
    lambdaDs.createResolver({
      typeName: 'Mutation',
      fieldName: 'createEmail',
    });
    ```

15. Deploy the app using `cdk deploy`
16. Test and destroy using `cdk destroy`
