# Environment Variables

This document describes all environment variables used in the Booking System Owner application.

## Quick Start

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the required variables in `.env.local`

3. Check your configuration:
   ```bash
   pnpm check-env
   ```

## Variable Categories

### Public Variables (NEXT_PUBLIC_*)

These variables are available on the client-side and are bundled into the JavaScript.

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ | API base URL for client requests | `http://localhost:3000/api` |
| `NEXT_PUBLIC_APP_NAME` | ✅ | Application name displayed to users | `Booking System Owner` |
| `NEXT_PUBLIC_APP_URL` | ✅ | Application URL | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_VERSION` | ❌ | Application version | `1.0.0` |
| `NEXT_PUBLIC_ENVIRONMENT` | ❌ | Environment type | `development` |

### Server-Only Variables

These variables are only available on the server-side and are not exposed to the client.

#### Database

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ | Database connection URL | `postgresql://user:pass@localhost:5432/db` |

#### Authentication

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `AUTH_COOKIE_NAME` | ✅ | Authentication cookie name | `booking-system-auth` |
| `AUTH_SECRET` | ✅ | Authentication secret (min 32 chars) | `super-secret-key-32-chars-min` |
| `AUTH_URL` | ✅ | Authentication URL | `http://localhost:3000` |

#### External Services (Optional)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `STRIPE_PUBLIC_KEY` | ❌ | Stripe public key | `pk_test_...` |
| `STRIPE_SECRET_KEY` | ❌ | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | ❌ | Stripe webhook secret | `whsec_...` |

#### Email (Optional)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `SMTP_HOST` | ❌ | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | ❌ | SMTP server port | `587` |
| `SMTP_USER` | ❌ | SMTP username | `user@gmail.com` |
| `SMTP_PASS` | ❌ | SMTP password | `app-password` |

#### Caching (Optional)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `REDIS_URL` | ❌ | Redis connection URL | `redis://localhost:6379` |

#### File Storage (Optional)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `UPLOAD_DIR` | ❌ | Directory for file uploads | `./uploads` |
| `MAX_FILE_SIZE` | ❌ | Maximum file size in bytes | `10485760` (10MB) |

#### Rate Limiting (Optional)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RATE_LIMIT_WINDOW_MS` | ❌ | Rate limit window in milliseconds | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | ❌ | Max requests per window | `100` |

## Environment-Specific Configuration

### Development
- `NEXT_PUBLIC_ENVIRONMENT=development`
- Debug mode enabled
- Detailed error messages
- Hot reloading enabled

### Staging
- `NEXT_PUBLIC_ENVIRONMENT=staging`
- Debug mode disabled
- Production-like settings
- Testing environment

### Production
- `NEXT_PUBLIC_ENVIRONMENT=production`
- Debug mode disabled
- Optimized for performance
- Error logging only

## Validation

The application automatically validates environment variables on startup using Zod schemas. If validation fails:

1. The application will not start
2. Clear error messages will be displayed
3. Instructions for fixing the issues will be shown

## Security Notes

- Never commit `.env.local` files to version control
- Use strong, unique secrets for production
- Rotate secrets regularly
- Use environment-specific values
- Consider using a secrets management service for production

## Troubleshooting

### Common Issues

1. **Missing required variables**: Copy `.env.example` to `.env.local` and fill in all required values
2. **Invalid URL format**: Ensure URLs include protocol (http:// or https://)
3. **Secret too short**: AUTH_SECRET must be at least 32 characters
4. **Database connection issues**: Check DATABASE_URL format and database availability

### Debug Commands

```bash
# Check environment variables
pnpm check-env

# Validate TypeScript types
pnpm typecheck

# Run linting
pnpm lint
```
