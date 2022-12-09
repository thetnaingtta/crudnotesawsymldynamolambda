"use strict";
const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.an_authenticated_user = async () => {
  const userPoolId = process.env.USER_POOL_ID;
  const clientId = process.env.CLIENT_ID;
  const username = process.env.USER_NAME;
  const password = process.env.PASS_WORD;

  const params = {
    UserPoolId: userPoolId,
    ClientId: clientId,
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  let user = await cognito.adminInitiateAuth(params).promise();
  return user;
};
