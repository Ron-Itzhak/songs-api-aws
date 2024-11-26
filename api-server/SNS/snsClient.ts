import { SNSClient } from "@aws-sdk/client-sns";
import { fromEnv, fromIni, fromSSO } from "@aws-sdk/credential-providers";
const REGION = "eu-central-1";
const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
  //   credentials: fromSSO({ profile: "AdministratorAccess-592041974036" }),
  credentials: fromEnv(),
});
export { snsClient };
