# Refill server

## Configure Brevo transactional SMS

The server sends registration verification codes through Brevo's transactional
SMS API using Node's built-in `fetch`; no additional SMS package is required.

1. In Brevo, create an API key and register/verify an SMS sender. Ensure
   transactional SMS is enabled and your account has SMS credit.
2. Copy `.env.example` to `.env`, then set `BREVO_API_KEY` and
   `BREVO_SMS_SENDER`. Keep `.env` private and do not commit API keys.
3. Submit registration phone numbers in the international format required by
   Brevo for the destination country.
4. Run `npm run dev`. Registration sends the code to the submitted phone number;
   the verification code is not included in the API response.

Brevo API errors fail registration explicitly. Check the server error log and
Brevo transactional SMS logs if a message is rejected.
