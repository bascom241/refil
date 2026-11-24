import { ExternalServiceError } from "../errors/ExternalServiceError.js";

const BREVO_SMS_URL = "https://api.brevo.com/v3/transactionalSMS/sms";

export const sendVerificationSms = async (
  recipient: string,
  verificationCode: string,
): Promise<void> => {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SMS_SENDER;

  if (!apiKey || !sender) {
    throw new Error("BREVO_API_KEY and BREVO_SMS_SENDER must be configured");
  }

  const response = await fetch(BREVO_SMS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender,
      recipient,
      content: `Your Refill verification code is ${verificationCode}. It expires in 10 minutes.`,
      type: "transactional",
    }),
  });

  if (!response.ok) {
    throw new ExternalServiceError(
      `Brevo rejected the transactional SMS request (HTTP ${response.status})`,
    );
  }
};


export const sendResetPassord = async (
  recipient: string, 
  verificationCode: string 
): Promise<void>=> {
    const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SMS_SENDER;

  if (!apiKey || !sender) {
    throw new Error("BREVO_API_KEY and BREVO_SMS_SENDER must be configured");
  }


  const response = await fetch(BREVO_SMS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender,
      recipient,
      content: `Your Refill Reset code is ${verificationCode}. It expires in 10 minutes.`,
      type: "transactional",
    }),
  });

  if (!response.ok) {
    throw new ExternalServiceError(
      `Brevo rejected the transactional SMS request (HTTP ${response.status})`,
    );
  }
}
