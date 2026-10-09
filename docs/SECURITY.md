# Security Policy

## Practices
- **HTTP Headers**: Strict-Transport-Security, X-Frame-Options: DENY, X-Content-Type-Options: nosniff
- **Authentication**: Salted Bcrypt hashing + signed JWTs in HttpOnly SameSite cookies
- **Rate Limiting**: Applied to auth and registration endpoints
