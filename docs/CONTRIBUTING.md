# Contributing

## Project structure

The mobile application and server are separate npm packages. Run package
commands from the corresponding directory:

- `mobile/` — Expo, React Native, Expo Router, TypeScript, and NativeWind.
- `server/` — Express, TypeScript, Mongoose, Zod, and JWT helpers.

## Local development

For the mobile app:

```powershell
cd mobile
npm install
npm start
```

Useful mobile scripts:

```powershell
npm run android
npm run ios
npm run web
npm run lint
```

For the server:

```powershell
cd server
npm install
Copy-Item .env.example .env
npm run dev
```

The server currently defines only the `dev` script, which runs `tsx
src/server.ts` through Nodemon. There is no configured server build, test, or
lint script yet. The mobile package has a lint script but no test script.

## Change guidelines

- Keep mobile and server changes within their respective package directories
  unless a shared contract or repository-level document is being changed.
- Prefer explicit TypeScript types and follow nearby file naming and formatting
  conventions.
- Validate untrusted request data at the API boundary. Keep API schemas and
  OpenAPI definitions aligned.
- Do not expose credentials, password hashes, verification tokens, or signing
  secrets in responses, logs, or committed files.
- Update the architecture, environment guide, and OpenAPI document when the
  actual system behavior or public API changes.
- Add tests with new behavior. Until a server test runner is configured,
  document that the server behavior has not been automatically tested.

## Before opening a change

Run the mobile lint check when mobile source is changed:

```powershell
cd mobile
npm run lint
```

For server changes, inspect the relevant TypeScript modules and exercise the
behavior with tests or a documented manual check. A dedicated server test/build
script should be added as part of establishing the backend's normal validation
workflow.

## API changes

The Express app currently has no mounted routes and Swagger UI is not configured.
Do not add an OpenAPI operation that is not implemented. When an API route is
implemented:

1. Validate and mount the route.
2. Cover its success and error behavior with tests.
3. Update `docs/openapi.yaml`.
4. Update this documentation if setup or configuration changes.
