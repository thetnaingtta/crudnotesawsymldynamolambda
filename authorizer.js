const { CognitoJwtVerifier } = require("aws-jwt-verify");

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-1_QeTO3K84Q",
  tokenUse: "id",
  clientId: "105k0u0jgddhq6rnjcuath78p3",
});

const generatePolicy = (principalId, effect, resource) => {
  var authRepsonse = {};

  authRepsonse.principalId = principalId;

  if (effect && resource) {
    let policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Resource: resource,
          Action: "execute-api:Invoke",
        },
      ],
    };
    authRepsonse.policyDocument = policyDocument;
  }

  authRepsonse.context = {
    foo: "bar",
  };

  console.log(JSON.stringify(authRepsonse));

  return authRepsonse;
};

exports.handler = async (event, context, callback) => {
  // lambda authorizer code

  var token = event.authorizationToken;
  console.log(token);
  // Validate the token

  try {
    const payload = await jwtVerifier.verify(token);
    console.log(JSON.stringify(payload));
    callback(null, generatePolicy("user", "Allow", event.methodArn));
  } catch (err) {
    callback("Error: Invalid Token") 
  }

  // var token = event.authorizationToken; // "allow or deny"
  // switch (token) {
  //   case "allow":
  //     callback(null, generatePolicy("user", "Allow", event.methodArn));
  //     break;
  //     case "deny":
  //       callback(null, generatePolicy("user", "Deny", event.methodArn));
  //       break;
  //       default:
  //           callback("Error: Invalid Token")
  // }


  // https://mynotesdemomodernsg.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=105k0u0jgddhq6rnjcuath78p3&redirect_uri=http://localhost:3000
};
