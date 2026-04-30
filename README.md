# Payment Service

Payment microservice for the Online Bookstore system.

## Features

- Process payment records
- Retrieve payments by user
- Admin endpoint to retrieve all payments
- JWT-protected routes

## API

- `POST /payments`
- `GET /payments/:userId`
- `GET /payments` (admin only)
- `GET /health`

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Default port: `5004`

## Environment variables

Set these before deploying the service:

- `PORT` - server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - must match the secret used by the service that issues your user tokens
- `CLIENT_ORIGIN` - frontend origin allowed by CORS
- `INTERNAL_API_KEY` - shared key for service-to-service calls
- `ORDER_SERVICE_URL` - base URL of the order service

If your deployment platform uses a different token-secret name, the service also accepts `AUTH_JWT_SECRET` and `ACCESS_TOKEN_SECRET` as fallbacks.
