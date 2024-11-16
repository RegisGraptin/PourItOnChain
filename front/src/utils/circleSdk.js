// circleSdk.js
import { CircleProgrammableWallet } from "@circle-fin/w3s-pw-web-sdk";

let circleSdk = null;

export function getCircleSdk() {
  if (!circleSdk) {
    circleSdk = new CircleProgrammableWallet({
      apiKey: process.env.NEXT_PUBLIC_CIRCLE_API_KEY,
      baseUrl: process.env.NEXT_PUBLIC_CIRCLE_BASE_URL,
    });
  }
  return circleSdk;
}
