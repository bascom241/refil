# Environment and configuration

## Server

The server reads environment variables through `dotenv`. For local development,
create `server/.env` from `server/.env.example` and supply your own values.
Never commit `.env` files or put real credentials in documentation, source
files, screenshots, or issue reports.

| Variable | Required by current code | Purpose |
| --- | --- | --- |
| `PORT` | No | HTTP listener port. Defaults to `3000`. |
| `MONGODB_URI` | Yes for startup | MongoDB connection URI checked by `config/db.ts`. The current helper does not yet open a database connection. |
| `JWT_SECRET` | When generating/access-token verification | Signing key used by `generateToken` and the token-validation middleware. Use a long, random, private value. |
| `REFRESH_TOKEN_SECRET` | When generating a refresh token | Signing key used by the refresh-token helper. That helper is not currently connected to an HTTP route. |

`MONGODB_USERNAME` and `MONGODB_PASSWORD` are not read by the current server
implementation. Provide credentials as part of `MONGODB_URI` if required by the
chosen MongoDB deployment. Do not duplicate credentials into separate variables
unless code is added to consume them.

The checked-in example uses placeholders only. It is not a working connection
string. Since the current database helper only checks whether a URI is set,
successful server startup does not confirm database connectivity.

## Mobile

No mobile-specific environment variables or API base URL are currently
configured. The app does not yet make requests to the server. When that
integration is added, keep local values in an untracked local environment file
or the project's approved secret/configuration system; mobile app values are
not a safe place for server secrets.

## CORS

The current CORS allowlist is hard-coded in `server/config/cors.ts` rather than
read from environment configuration. Update it deliberately when adding local
web clients or deployed origins. The server's CORS configuration does not
configure a mobile API URL or make the server publicly reachable.

## Secret handling

- Keep the real `server/.env` local and out of version control.
- Use unique, randomly generated secrets for local and deployed environments.
- If a credential has been shared or committed, revoke/rotate it; removing it
  from a file does not invalidate the exposed credential.
- Do not log connection strings or token values. Review server logs before
  sharing them.
