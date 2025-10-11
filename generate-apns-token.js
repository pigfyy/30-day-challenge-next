const crypto = require("crypto");
const fs = require("fs");

// Configuration
const teamId = "RMV469Q2GF";
const keyId = "SCPWNHUDB9";
const privateKeyPath = "./AuthKey_SCPWNHUDB9.p8";

// Read the private key
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

// Create JWT header
const header = {
  alg: "ES256",
  kid: keyId,
};

// Create JWT payload (with 10 year expiration)
const now = Math.floor(Date.now() / 1000);
const payload = {
  iss: teamId,
  iat: now,
  exp: now + 10 * 365 * 24 * 60 * 60, // 10 years from now
};

// Encode to base64url
function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Create token parts
const encodedHeader = base64url(JSON.stringify(header));
const encodedPayload = base64url(JSON.stringify(payload));
const signingInput = `${encodedHeader}.${encodedPayload}`;

// Sign the token
const sign = crypto.createSign("sha256");
sign.update(signingInput);
sign.end();
const signature = sign.sign(privateKey);
const encodedSignature = base64url(signature);

// Combine to create the JWT
const token = `${signingInput}.${encodedSignature}`;

console.log("APNs Authentication Token:");
console.log(token);
console.log("\nThis token is valid for 10 years.");
console.log(`Generated at: ${new Date().toISOString()}`);
console.log(
  `Expires at: ${new Date((now + 10 * 365 * 24 * 60 * 60) * 1000).toISOString()}`,
);
