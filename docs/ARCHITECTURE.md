# Architecture

## Current system

The repository contains two independent Node.js packages:

```text
Expo / React Native app
  └── Expo Router screens and UI components
      └── No API client or server requests found

Express server
  ├── JSON request parsing and CORS
  ├── User and address Mongoose model definitions
  ├── Registration controller/service code (not mounted as an HTTP route)
  └── MongoDB helper (checks configuration; does not connect)
```

The mobile app uses Expo Router with route files under `mobile/src/app`. Current
routes include onboarding, authentication screens, explore, and profile. The
registration screen currently advances to login; it does not submit registration
data to the server.

The server entry point is `server/src/server.ts`. It loads environment
configuration, calls `connectToDB`, and then starts the Express listener. The
Express application in `server/src/app.ts` currently installs JSON parsing and
CORS only.

## Backend domain model

- **User** (`server/src/auth/auth.model.ts`): phone number, name, password,
  role, and verification/password-reset token fields. Roles are `Vendor`,
  `Customer`, and `Rider`.
- **Address** (`server/src/address/address.model.ts`): user reference, label,
  street/city/state/country, optional additional information, coordinates, and
  default-address flag. Address labels are `Home`, `Work`, and `Other`;
  location type currently supports `Point`.

The registration code is represented by `auth.controller.ts`,
`auth.service.ts`, and request/response types. It should not be treated as a
working API contract yet: no router mounts the controller, and the current
controller's top-level request fields do not match the nested `address` object
expected by its validation schema. The registration service also has unfinished
user lookup/create logic. Resolve these implementation issues before exposing
or relying on registration.

## API and persistence status

- No Express router is currently registered in `app.ts`.
- The error-handling and request-validation middleware exist but are not
  installed in the Express app.
- `config/db.ts` checks for `MONGODB_URI` and logs a message; it does not call
  `mongoose.connect`. Do not interpret its log message as proof of a live
  database connection.
- The OpenAPI document is [`openapi.yaml`](openapi.yaml). It has no paths
  because no HTTP operations are mounted.
- Swagger UI is not configured.

## Important flows to complete

1. Implement a real MongoDB connection and fail startup if the connection fails.
2. Correct registration validation/controller/service behavior and decide the
   public route and request/response contract.
3. Mount the router and validation/error middleware in the Express app.
4. Add the resulting, tested routes to the OpenAPI document and expose Swagger
   UI only if desired.
5. Add a mobile API client and connect the screens to the agreed server
   contract.
6. Add automated tests for the API and important mobile behaviors.
