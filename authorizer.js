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

exports.handler = (event, context, callback) => {
  // lambda authorizer code
  var token = event.authorizationToken; // "allow or deny"
  switch (token) {
    case "allow":
      callback(null, generatePolicy("user", "Allow", event.methodArn));
      break;
      case "deny":
        callback(null, generatePolicy("user", "Deny", event.methodArn));
        break;
        default:
            callback("Error: Invalid Token")
  }
};
