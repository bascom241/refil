# Refill

Refill is a mobile application and Node.js API project. The mobile client is built
with Expo and React Native; the API is built with Express, TypeScript, and
Mongoose. The current source includes onboarding and authentication screens plus
early user/address registration code.

> **Project status:** this is a development scaffold, not a deployable end-to-end
> application yet. The Express app does not currently mount any API routes, the
> registration controller is not reachable over HTTP, and the database helper
> does not establish a MongoDB connection. See [Architecture](docs/ARCHITECTURE.md)
> and [OpenAPI](docs/openapi.yaml) for details.

## Repository layout

```text
.
├── mobile/                 # Expo / React Native application
├── server/                 # Express API and MongoDB-related models/services
└── docs/
    ├── ARCHITECTURE.md     # Current components and implementation status
    ├── CONTRIBUTING.md     # Development and contribution workflow
    ├── ENVIRONMENT.md      # Server configuration
    └── openapi.yaml        # OpenAPI document; no HTTP operations are mounted yet
```

## Requirements

- Node.js and npm versions compatible with the installed Expo and TypeScript
  packages.
- A MongoDB connection URI for work that needs a database. Database connectivity
  is not fully implemented in the current server code.
- Expo Go or an Android/iOS development environment for running the mobile app
  on a device or emulator.

## Quickstart

Install and start the API development process:

```powershell
cd server
npm install
Copy-Item .env.example .env
# Edit .env with local values (see ../docs/ENVIRONMENT.md)
npm run dev
```

The server starts on port `3000` by default, or the value of `PORT`. At this
stage, there are no HTTP routes to call. The database helper currently checks
that `MONGODB_URI` exists but does not connect to MongoDB.

In a second terminal, install and start the mobile app:

```powershell
cd mobile
npm install
npm start
```

Expo also provides these package scripts:

```powershell
npm run android
npm run ios
npm run web
npm run lint
```

The mobile app does not currently call the API. When using a physical device,
Expo's development server must be reachable from that device over the local
network.

## Documentation

- [Architecture and implementation status](docs/ARCHITECTURE.md)
- [Environment variables and local configuration](docs/ENVIRONMENT.md)
- [Contributing and development workflow](docs/CONTRIBUTING.md)
- [OpenAPI document](docs/openapi.yaml)

Swagger UI is not currently installed or mounted by the server. The OpenAPI file
is a starting point and intentionally contains no operations until HTTP routes
and their public contracts are implemented.
